'use client'
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>(
    undefined
  )

  const logout = useCallback(() => {
    setProvider(undefined)
    setAddress('')
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
