/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as os from 'node:os'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { afterEach, beforeEach } from 'node:test'

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const setFailedMock = jest.spyOn(core, 'setFailed')
const addPathMock = jest.spyOn(core, 'addPath')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

const mktemp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'setup-age-action-'))

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets up age on the path', async () => {
    process.env.INPUT_VERSION = 'v1.1.1'
    process.env.RUNNER_TEMP = mktemp()
    process.env.RUNNER_TOOL_CACHE = mktemp()

    await main.run()

    expect(runMock).toHaveReturned()
    expect(setFailedMock).toBeCalledTimes(0)
    expect(addPathMock).toBeCalledTimes(1)
    expect(addPathMock.mock.lastCall![0]).toMatch(/age\/1\.1\.1\/x64$/)
  })
})
