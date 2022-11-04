export function putLocalData(key: string, value: any) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.localStorage.setItem(key, value)
  }
}

export function getLocalData(key: string, defaultValue: any) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const res = window.localStorage.getItem(key)
    if (res) {
      return res
    } else {
      return defaultValue
    }
  } else {
    return defaultValue
  }
}

export function removeLocalData(key: string) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.localStorage.removeItem(key)
  }
}

export function clear() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.localStorage.clear()
  }
}
