import process from 'node:process'
import { runAction } from '@stacksjs/actions'
import { intro, log, outro } from '@stacksjs/cli'
import { Action } from '@stacksjs/enums'
import { ExitCode } from '@stacksjs/types'
import type { CLI, ReleaseOptions } from '@stacksjs/types'

const descriptions = {
  release: 'Release a new version of your libraries/packages',
  project: 'Target a specific project',
  dryRun: 'Run the release without actually releasing',
  verbose: 'Enable verbose output',
}

export function release(buddy: CLI) {
  buddy
    .command('release', descriptions.release)
    .option('--dry-run', descriptions.dryRun, { default: false })
    .option('-p, --project', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (options: ReleaseOptions) => {
      log.debug('Running `buddy release` ...', options)

      if (options.dryRun) log.warn('Dry run enabled. No changes will be made or committed.')

      const startTime = await intro('buddy release')
      const result = await runAction(Action.Release, {
        stdin: 'inherit',
        ...options,
      })

      if (result.isErr()) {
        log.error('Failed to release', result.error)
        process.exit(ExitCode.FatalError)
      }

      await outro('Triggered CI/CD Release Workflow', {
        startTime,
        useSeconds: true,
      })
    })

  buddy.on('release:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', buddy.args.join(' '))
    process.exit(1)
  })
}
