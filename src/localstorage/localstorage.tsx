export function putLocalData(key: string, value: any) {
  console.log('set item:' + key + ' value:' + value)

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    console.log('set item:' + key + ' value:' + value)

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
