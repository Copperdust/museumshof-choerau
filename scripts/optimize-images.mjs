/**
 * Pre-build image optimizer.
 * Converts all JPG/JPEG/PNG images in public/images/ to WebP.
 * Originals are kept as-is — only .webp files are generated alongside them.
 * The .webp files are gitignored and regenerated on every build.
 */
import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const QUALITY = 80
const IMAGE_ROOT = 'public/images'
const EXTENSIONS = /\.(jpg|jpeg|png)$/i

async function findImages(dir) {
  const results = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...await findImages(fullPath))
    } else if (EXTENSIONS.test(entry.name)) {
      results.push(fullPath)
    }
  }
  return results
}

async function convertToWebp(filePath) {
  const ext = extname(filePath)
  const webpPath = filePath.slice(0, -ext.length) + '.webp'
  const original = await stat(filePath)

  // Skip if webp is newer than source
  try {
    const existing = await stat(webpPath)
    if (existing.mtimeMs >= original.mtimeMs) return null
  } catch {}

  await sharp(filePath)
    .webp({ quality: QUALITY })
    .toFile(webpPath)

  const optimized = await stat(webpPath)
  const saved = ((1 - optimized.size / original.size) * 100).toFixed(0)
  return {
    file: filePath.replace(IMAGE_ROOT + '/', ''),
    original: (original.size / 1024).toFixed(0),
    webp: (optimized.size / 1024).toFixed(0),
    saved: `${saved}%`,
  }
}

const files = await findImages(IMAGE_ROOT)
let converted = 0
let totalOriginal = 0
let totalWebp = 0

for (const file of files) {
  const result = await convertToWebp(file)
  if (result) {
    converted++
    totalOriginal += parseInt(result.original)
    totalWebp += parseInt(result.webp)
    console.log(`  ${result.file}: ${result.original}KB → ${result.webp}KB (${result.saved})`)
  }
}

if (converted > 0) {
  console.log(`\nConverted ${converted} images: ${totalOriginal}KB → ${totalWebp}KB (saved ${((1 - totalWebp / totalOriginal) * 100).toFixed(0)}%)`)
} else {
  console.log('All images up to date.')
}
