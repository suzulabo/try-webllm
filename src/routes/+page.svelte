<script lang='ts'>
  import { Badge } from '$lib/components/ui/badge'
  import { Button } from '$lib/components/ui/button'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card'
  import { Progress } from '$lib/components/ui/progress'
  import { Textarea } from '$lib/components/ui/textarea'
  import { ModelRunner } from '$lib/llm-runner.svelte'

  let prompt = $state('Tell me a short joke about programming.')
  const runner = new ModelRunner()

  async function handleRun() {
    if (!prompt.trim())
      return
    await runner.runAll(prompt)
  }
</script>

<div class='container mx-auto py-8 space-y-8'>
  <div class='space-y-4'>
    <h1 class='text-3xl font-bold'>WebLLM Model Verification</h1>
    <p class='text-muted-foreground'>
      Run the same prompt across multiple LLMs in your browser to verify performance and output.
    </p>
  </div>

  <Card>
    <CardHeader>
      <CardTitle>Input Prompt</CardTitle>
      <CardDescription>Enter the prompt you want to test with all models.</CardDescription>
    </CardHeader>
    <CardContent class='space-y-4'>
      <Textarea
        placeholder='Enter your prompt here...'
        bind:value={prompt}
        rows={4}
        class='resize-y'
      />
      <Button
        onclick={handleRun}
        disabled={runner.isRunning || !prompt.trim()}
        class='w-full sm:w-auto'
      >
        {runner.isRunning ? 'Running Sequence...' : 'Run All Models'}
      </Button>
    </CardContent>
  </Card>

  <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
    {#each runner.results as result (result.modelId)}
      <Card class={result.status === 'generating' ? 'border-primary ring-1 ring-primary' : ''}>
        <CardHeader class='pb-3'>
          <div class='flex items-start justify-between gap-2'>
            <CardTitle class='text-base font-medium break-all'>{result.modelId}</CardTitle>
            {#if result.status === 'idle'}
              <Badge variant='outline'>Idle</Badge>
            {:else if result.status === 'loading'}
              <Badge variant='secondary'>Loading</Badge>
            {:else if result.status === 'generating'}
              <Badge variant='default' class='animate-pulse'>Generating</Badge>
            {:else if result.status === 'done'}
              <Badge variant='default' class='bg-green-600 hover:bg-green-700'>Done</Badge>
            {:else if result.status === 'error'}
              <Badge variant='destructive'>Error</Badge>
            {/if}
          </div>
        </CardHeader>
        <CardContent>
          {#if result.status === 'loading'}
            <div class='space-y-2 py-4'>
              <Progress value={result.progress} />
              <p class='text-xs text-muted-foreground text-center'>{result.progressText} ({Math.round(result.progress)}%)</p>
            </div>
          {:else if result.output || result.status === 'error'}
            <div class='text-sm rounded-md bg-muted p-4 whitespace-pre-wrap font-mono min-h-[100px] max-h-[300px] overflow-y-auto'>
              {result.output || '(No output)'}
            </div>
          {:else}
            <div class='text-sm rounded-md bg-muted/50 p-4 min-h-[100px] flex items-center justify-center text-muted-foreground'>
              Waiting to start...
            </div>
          {/if}
        </CardContent>
      </Card>
    {/each}
  </div>
</div>
