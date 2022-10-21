import React from 'react'

export default function Login() {
  function content() {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <form action="/login" className="w-full max-w-sm">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
                required
                value=""
              ></input>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
                required
                value=""
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <span>Sign in to account</span>
            </button>
          </form>
        </div>
      </main>
    )
  }

  return <>{content()}</>
}
