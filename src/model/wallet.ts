export interface WalletInfo {
  wallet_address: string
  balance: string
  sub_balance: string
  lock_balance: string
  available_balance: string
  wallet_accounts: WalletAccount[]
}

export interface WalletAccount {
  label: string
  coin_type: string
  wallet_address: string
  deposit_minimum: string
  withdraw_minimum: string
  withdraw_fee: string
}

export interface WalletTransaction {
  id: number
  trade_type: number
  trade_label: string
  event: string
  txid: string
  amount: string
  fees: string
  gas_fee: string
  created_at: number
  status: number
  wallet_balance: string
  asset_name: string
  total: string
}
