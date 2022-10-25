export interface UserInfo {
  access_token: string
  id: number
  name: string
  email: string
  avatar: string | undefined
  wallet_address: string | undefined
  payment_password_set: number
  is_new: number
  is_kyc: number
}


export interface LoginParams {
  email: string,
  code: string
}