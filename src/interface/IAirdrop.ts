export interface IAirdrop {
  name: string
  address: string
  totalAirdropAmount: number
  airdropAmountLeft: number
  claimAmount: number
  expirationDate: Date
  progress?: number
  isClaimed?: boolean
  isAllowed?: boolean
  isExpired?: boolean
  balance?: number
  airdropType: 'custom' | 'merkle',
  merkle?: {
    address: string
    proof: string[],
    amount: string
  }
}
export interface ICreateAirdrop {
  name: string
  tokenAddress: string,
  totalAmount: number,
  claimAmount: number,
  expirationDate: string
}