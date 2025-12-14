import type { InitProgressCallback, MLCEngine } from '@mlc-ai/web-llm'
import { CreateMLCEngine } from '@mlc-ai/web-llm'
import { MODEL_IDS } from './consts'

export type ModelStatus = 'idle' | 'loading' | 'generating' | 'done' | 'error'

export interface ModelResult {
    modelId: string
    status: ModelStatus
    output: string
    progress: number
    progressText: string
}

export class ModelRunner {
    isRunning = $state(false)
    results = $state<ModelResult[]>([])

    constructor() {
        this.reset()
    }

    reset() {
        this.results = MODEL_IDS.map(id => ({
            modelId: id,
            status: 'idle',
            output: '',
            progress: 0,
            progressText: '',
        }))
    }

    async runAll(prompt: string) {
        if (this.isRunning)
return
        this.isRunning = true
        this.reset()

        for (const result of this.results) {
            await this.runOne(result, prompt)
        }

        this.isRunning = false
    }

    private async runOne(result: ModelResult, prompt: string) {
        result.status = 'loading'
        result.progress = 0
        result.progressText = 'Initializing...'

        const initProgressCallback: InitProgressCallback = (report) => {
            result.progress = report.progress * 100
            result.progressText = report.text
        }

        let engine: MLCEngine | undefined

        try {
            engine = await CreateMLCEngine(result.modelId, {
                initProgressCallback,
                logLevel: 'INFO',
            })

            result.status = 'generating'
            result.progress = 100
            result.progressText = 'Loaded'

            const messages = [
                { role: 'user', content: prompt },
            ]

            const completion = await engine.chat.completions.create({
                messages,
                stream: true,
            })

            for await (const chunk of completion) {
                const content = chunk.choices[0]?.delta.content || ''
                result.output += content
            }

            result.status = 'done'
        }
 catch (e: any) {
            console.error(`Error running ${result.modelId}:`, e)
            result.status = 'error'
            result.output += `\nError: ${e.message}`
        }
 finally {
            if (engine) {
                await engine.unload()
            }
        }
    }
}
