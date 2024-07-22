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
}