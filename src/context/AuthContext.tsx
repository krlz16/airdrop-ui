'use client'
import { IAirdrop } from '@/interface/IAirdrop'
import { ContractTransactionResponse } from 'ethers'
import { ethers } from 'ethers'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

interface AuthContextType {
  provider: ethers.BrowserProvider | undefined
  address: string
  logout: () => void
  setAddress: React.Dispatch<React.SetStateAction<string>>
  setProvider: React.Dispatch<React.SetStateAction<ethers.BrowserProvider | undefined>>
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
  isAdmin: boolean
  setAirdropLoading: React.Dispatch<React.SetStateAction<boolean>>
  airdropLoading: boolean
  setAirdrop: React.Dispatch<React.SetStateAction<IAirdrop | undefined>>
  airdrop: IAirdrop | undefined
  setTx: React.Dispatch<React.SetStateAction<ContractTransactionResponse | undefined>>
  tx: ContractTransactionResponse | undefined
  setAirdrops: React.Dispatch<React.SetStateAction<IAirdrop[] | undefined>>
  airdrops: IAirdrop[] | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string>('');
  const [airdrop, setAirdrop] = useState<IAirdrop>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [airdropLoading, setAirdropLoading] = useState<boolean>(false);
  const [tx, setTx] = useState<ContractTransactionResponse>();
  const [airdrops, setAirdrops] = useState<IAirdrop[]>();

  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>(
    undefined
  )

  const logout = useCallback(() => {
    setProvider(undefined);
    setAddress('');
    setIsAdmin(false);
    setTx(undefined);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        setIsAdmin,
        isAdmin,
        logout,
        provider,
        setProvider,
        address,
        setAddress,
        airdrop,
        setAirdrop,
        setTx,
        tx,
        setAirdropLoading,
        airdropLoading,
        airdrops,
        setAirdrops
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
