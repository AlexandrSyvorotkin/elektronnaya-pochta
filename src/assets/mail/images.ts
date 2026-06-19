const imageModules = import.meta.glob<string>(
  ['./**/*.{png,jpg,jpeg,gif,webp,svg,PNG,JPG,JPEG,GIF,WEBP,SVG}'],
  {
    eager: true,
    import: 'default',
  },
)

export const specialMailImages = Object.entries(imageModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true }),
  )
  .map(([, url]) => url)

export function getSpecialMailImageName(url: string, index: number) {
  const fileName = url.split('/').pop() ?? `image-${index + 1}`
  return decodeURIComponent(fileName.replace(/\?.*$/, ''))
}
