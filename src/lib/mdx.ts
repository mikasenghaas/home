import path from 'path'
import fs from 'fs'
import { sync } from 'glob'

export async function scanDirectory(filePath: string) {
  const directoryContents: string[] = sync(`${path.join(process.cwd(), filePath)}`)

  return directoryContents
}

export async function scanFile(filePath: string) {
  const fileSource : Buffer = fs.readFileSync(path.join(path.join(process.cwd(), `${filePath}`)))

  return fileSource
}