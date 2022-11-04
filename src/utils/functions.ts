export function splitAddress(address: string): string {
  if (!address) {
    return address
  }
  if (address.length < 12) {
    return address
  }
  const start = address.substring(0, 6)
  const end = address.substring(address.length - 6)
  return `${start}...${end}`
}

export function trimStr(str: string): string {
  if (!str) {
    return str
  }
  if (str.length < 24) {
    return str
  }

  return str.substring(0, 20) + '...'
}

export default async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content)
    console.log('copied to clipboard')
  } catch (error) {
    console.log('failed to copy to clipboard. error=' + error)
  }
}

export function floorNum(num) {
  return Math.floor(num * 100) / 100
}

export function isInViewPort(el) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight + 100
}
