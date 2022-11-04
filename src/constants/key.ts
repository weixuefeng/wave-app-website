interface LocalKeyInterface {
  readonly LANGUAGE: string
  readonly TOKEN: string
  readonly USER: string
  readonly WALLET: string
}

export const LocalKey: LocalKeyInterface = {
  LANGUAGE: 'language',
  TOKEN: 'token',
  USER: 'user',
  WALLET: 'wallet',
}
