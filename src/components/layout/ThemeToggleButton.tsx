/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:07:34
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 11:01:35
 * @FilePath: /nextjs-starter-boilerplate/src/components/layout/ThemeToggleButton.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <a
      href="#"
      rel="nofllow"
      onClick={e => {
        e.preventDefault()
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      <div className="group mx-1 rounded-full p-1 text-slate-500 hover:bg-blue-800 dark:hover:bg-blue-200">
        {resolvedTheme === 'light' ? (
          <MoonIcon className="h-6 w-6 group-hover:text-yellow-500" />
        ) : (
          <SunIcon className="h-6 w-6 group-hover:text-red-400" />
        )}
      </div>
    </a>
  )
}

export default ThemeToggleButton
