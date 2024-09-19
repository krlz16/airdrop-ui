import { useState, useCallback } from 'react'
import Resolver from '@rsksmart/rns-resolver.js'
import { useAuth } from '@/context/AuthContext'
import web3 from "web3"

export const getAddr = async (domain: string) => {
  let resolver

  resolver = Resolver.forRskTestnet({})

  return resolver.addr(domain)
}

const useConnectRNSDomain = () => {
  const { setDomain, setAddress } = useAuth()
  const [isError, setIsError] = useState(false);

  const search = useCallback(async (domain: string) => {
    try {
      const addr = await getAddr(domain)
      setDomain(domain)
      setAddress(web3.utils.toChecksumAddress(addr));
    } catch (error) {
      console.error('Error searching RNS domain', error)
      setIsError(true)
    }
  }, [])

  return {
    search,
    isError,
    setIsError
  }
}

export default useConnectRNSDomain
