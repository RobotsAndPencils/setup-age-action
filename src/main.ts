import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

import { platform } from 'node:os'
import { arch } from 'node:process'

const REPO = 'age'
const OWNER = 'FiloSottile'

export async function run(): Promise<void> {
  try {
    const args = getArgs()

    const downloadInfo: DownloadInfo = {
      arch: getReleaseArch(arch),
      platform: getReleasePlatform(platform()),
      version: args.version
    }

    core.info(
      `downloading age ${downloadInfo.version} for ${downloadInfo.platform}-${downloadInfo.arch}`
    )
    const releaseUrl = getReleaseUrl(downloadInfo)
    const ageArchivePath = await tc.downloadTool(releaseUrl)
    const agePath = await tc.extractTar(ageArchivePath)
    const cachedAgePath = await tc.cacheDir(
      agePath,
      'age',
      downloadInfo.version
    )
    core.addPath(cachedAgePath)
    core.info('age downloaded and added to path')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
    else if (typeof error === 'string') core.setFailed(error)
    else throw error
  }
}

function getReleasePlatform(runnerPlatform: NodeJS.Platform) {
  switch (runnerPlatform) {
    case 'linux':
    case 'darwin':
      return runnerPlatform

    default:
      throw new Error(`unsupported runner platform: ${runnerPlatform}`)
  }
}

function getReleaseArch(runnerArch: NodeJS.Architecture) {
  switch (runnerArch) {
    case 'arm':
    case 'arm64':
      return runnerArch

    case 'x64':
      return 'amd64'

    default:
      throw new Error(`unsupported runner architecture: ${runnerArch}`)
  }
}

interface DownloadInfo {
  arch: string
  platform: string
  version: string
}

function getReleaseUrl(info: DownloadInfo) {
  return `https://github.com/${OWNER}/${REPO}/releases/download/${info.version}/age-${info.version}-${info.platform}-${info.arch}.tar.gz`
}

function getArgs() {
  const version = core.getInput('version')

  if (!version) {
    throw new Error('missing version input')
  }

  if (!version.startsWith('v')) {
    throw new Error('invalid version input')
  }

  return { version }
}
