import { SettingConfig } from 'model/settings'
import { useEffect, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'

export default function useWallet() {
  const [settings, setSettings] = useState<SettingConfig>()

  useEffect(() => {
    Http.getInstance()
      .getCommonSettings()
      .then(res => {
        setSettings(res)
      })
      .catch(error => {
        Log.e(error)
      })
  }, [])

  return settings
}
