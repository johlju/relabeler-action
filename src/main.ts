import * as core from '@actions/core'
import * as github from '@actions/github'
import { wait } from './wait'

// Info:
//
// GitHub Actions toolkit packages:
// https://github.com/actions/toolkit
//
// @actions/core:
// https://www.npmjs.com/package/@actions/core
//
// @actions/github:
// https://github.com/actions/toolkit/tree/main/packages/github#usage
//
// @octokit/webhooks:
// https://www.npmjs.com/package/@octokit/webhooks#typescript
// https://github.com/actions/toolkit/tree/main/packages/github#webhook-payload-typescript-definitions
//
// Workflow Triggers:
// https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#on
// https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#issues
//
// Contexts:
// https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#github-context
//
// Better Error Reporting:
// https://joelhooks.com/jest-and-github-actions
//
// BLogs that explains Step-By-Step and shows testing but using older versions so there has been breaking change. Also how to load entire section using getInput()
// https://jeffrafter.com/working-with-github-actions/

async function run(): Promise<void> {
  try {
    core.info('Running the action Relabeler')

    // Action inputs can be read with getInput
    const ms: string = core.getInput('milliseconds')

    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Manually wrap output in a foldable group
    core.startGroup('Do some function')
    //doSomeFunction()
    core.warning('Just a warning message')
    core.endGroup()

    // Wrap an asynchronous function call in a foldable group
    const result = await core.group('Do the wait async in a group', async () => {
      wait(parseInt(ms, 10))
      return 1
    })

    core.info(`Returned ${result} from group`)

    if (core.isDebug()) {
      // curl -v https://github.com
    } else {
      // curl https://github.com
    }

    // Outputs can be set with setOutput which makes them available to be mapped
    // into inputs of other actions to ensure they are decoupled.
    core.setOutput('time', new Date().toTimeString())

    core.debug(`payload: ${github.context.payload.action}`)

    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const repoToken: string = core.getInput('repoToken')

    // Usage: https://github.com/actions/toolkit/tree/main/packages/github#usage
    const octokit = github.getOctokit(repoToken)

    // const token = process.env['GITHUB_TOKEN']
    // if (!token) return
    //const octokit: github.GitHub = new github.GitHub(repoToken)

    //const context = github.context

    // const newIssue = await octokit.issues.create({
    //   ...context.repo,
    //   title: 'New issue!',
    //   body: 'Hello Universe!'
    // })

    // The npm module @octokit/webhooks provides type definitions for the response payloads. You can cast the payload to these types for better type information.
    // First, install the npm module npm install @octokit/webhooks
    // Then, assert the type based on the eventName
    // https://github.com/actions/toolkit/tree/main/packages/github#webhook-payload-typescript-definitions
    // Note that changes to the exported types are not considered breaking changes,
    // as the changes will not impact production code, but only fail locally or during CI at build time.
    // https://www.npmjs.com/package/@octokit/webhooks#typescript
    //
    // if (github.context.eventName === 'push') {
    //   const pushPayload = github.context.payload as Webhooks.WebhookPayloadPush
    //   core.info(`The head commit is: ${pushPayload.head}`)
    // }
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though, or not...`)

    // You should use this library to set the failing exit code for your action.
    // If status is not set and the script runs to completion, that will lead to a success.
    core.setFailed(error.message)
  }
}

run()
