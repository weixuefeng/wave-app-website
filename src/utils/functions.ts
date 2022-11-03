export function splitAddress(address: string): string {
  if (!address) {
    return ''
  }
  if (address.length < 12) {
    return ''
  }
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 6)
  return `${start}...${end}`
}

export default async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content)
    console.log('copied to clipboard')
  } catch (error) {
    console.log('failed to copy to clipboard. error=' + error)
  }
}
