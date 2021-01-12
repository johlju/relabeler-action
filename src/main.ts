import * as core from '@actions/core'
import {wait} from './wait'

// Info:
// https://www.npmjs.com/package/@actions/core

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
      return
    })

    if (core.isDebug()) {
      // curl -v https://github.com
    } else {
      // curl https://github.com
    }

    // Outputs can be set with setOutput which makes them available to be mapped
    // into inputs of other actions to ensure they are decoupled.
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though, or not...`);

    // You should use this library to set the failing exit code for your action.
    // If status is not set and the script runs to completion, that will lead to a success.
    core.setFailed(error.message)
  }
}

run()
