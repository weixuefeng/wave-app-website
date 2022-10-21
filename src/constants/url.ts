interface UrlConfigInterface {
  // login
  readonly login: string
  readonly logout: string

  // home
}

export const UrlConfig: UrlConfigInterface = {
  login: '/login',
  logout: '/logout',
}
