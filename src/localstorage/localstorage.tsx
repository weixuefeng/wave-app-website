import ls from 'localstorage-slim';

export function putLocalData(key: string, value: any) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    ls.set(key, value, { encrypt: true }); 
  }
}

export function getLocalData(key: string, defaultValue: any) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const res = ls.get(key, {decrypt: true});
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