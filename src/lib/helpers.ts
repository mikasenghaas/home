import fs from 'fs';
import path from 'path';
import { sync } from 'glob'

export async function scanDirectory(filePath: string) {
  const directoryContents: string[] = sync(`${path.join(process.cwd(), filePath)}`)

  return directoryContents
}

export async function scanFile(filePath: string) {
  const fileSource : Buffer = fs.readFileSync(path.join(path.join(process.cwd(), `${filePath}`)))

  return fileSource
}

export function capitalise(s: string) {
  return s.at(0)?.toUpperCase + s.substring(1)
}