'use client'
import {
  AIRDROP_MANAGER_ADDRESS,
  ARKA_PUBLIC_KEY,
  BUNDLER_API_KEY,
  CHAIN_ID,
  CUSTOM_BUNDLER_URL,
  FETCH_STATUS,
} from '@/constants'
import { useAuth } from '@/context/AuthContext'
import { IAirdrop } from '@/interface/IAirdrop'
import { ethers } from 'ethers'
import { useCallback, useEffect, useRef, useState } from 'react'
import merkleData from '@/utils/merkleData.json'
import { AirdropManager, AirdropManager__factory } from '../../typechain-types'
import {
  EtherspotBundler,
  MetaMaskWalletProvider,
  PrimeSdk,
} from '@etherspot/prime-sdk'

import AirdropAdminAbi from '@/utils/abi/AirdropManager.json'

const useAirdrop = () => {
  const RPC_PROVIDER = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  )
  let PROVIDER = useRef<ethers.JsonRpcSigner | ethers.JsonRpcProvider>(
    RPC_PROVIDER
  )

  const [isLoading, setIsLoading] = useState(FETCH_STATUS.INIT)
  const [airdropManager, setAirdropManager] = useState<AirdropManager>()
  const {
    provider,
    address,
    setIsAdmin,
    setTx,
    setAirdropLoading,
    setAirdrops,
  } = useAuth()

  const initializeProvider = useCallback(async () => {
    if (provider) {
      PROVIDER.current = await provider.getSigner()
    }
    const airdropManager = AirdropManager__factory.connect(
      AIRDROP_MANAGER_ADDRESS!,
      PROVIDER.current
    )
    setAirdropManager(airdropManager)
    return airdropManager
  }, [provider])

  useEffect(() => {
    initializeProvider()
  }, [provider, initializeProvider])

  const getAllAirdrops = useCallback(async () => {
    setAirdropLoading(true)
    const airdropManager = await initializeProvider()
    const items = await airdropManager?.getAirdrops()
    const airdropsDetail: IAirdrop[] = []
    for (const air in items) {
      const detail = await airdropManager?.getAirdropInfo(items[Number(air)])
      console.log('detail: ', detail)

      const newAirdrop: IAirdrop = {
        name: detail![0].toString(),
        address: detail![1].toString(),
        totalAirdropAmount: Number(ethers.formatEther(detail![2])),
        airdropAmountLeft: Number(ethers.formatEther(detail![3])),
        claimAmount: Number(ethers.formatEther(detail![4])),
        expirationDate: new Date(parseFloat(detail![5].toString()) * 1000),
        airdropType: Number(ethers.toBigInt(detail[6])) ? 'merkle' : 'custom',
      }
      console.log(
        'airdropamount unformatted is ',
        ethers.formatEther(detail![3])
      )

      console.log('airdropamount left is', newAirdrop.airdropAmountLeft)

      const balance = await airdropManager.getBalance(newAirdrop.address)
      newAirdrop.balance = Number(ethers.formatEther(balance))
      if (address) {
        newAirdrop.isClaimed = await airdropManager.hasClaimed(
          items[Number(air)].toString(),
          address
        )
        if (newAirdrop.airdropType === 'custom') {
          newAirdrop.isAllowed = await airdropManager.isAllowed(
            items[Number(air)].toString(),
            address
          )
        } else {
          newAirdrop.isAllowed = merkleData.claims.some(
            (merkle) => merkle.address.toLowerCase() === address
          )
          newAirdrop.merkle = merkleData.claims.find(
            (merkle) => merkle.address.toLowerCase() === address
          )
        }
      }
      const { airdropAmountLeft, totalAirdropAmount } = newAirdrop
      const progress =
        (totalAirdropAmount - airdropAmountLeft) / totalAirdropAmount
      newAirdrop.progress = Math.round(progress * 100)
      newAirdrop.isExpired = new Date(newAirdrop.expirationDate) < new Date()
      airdropsDetail.push(newAirdrop)
    }
    if (airdropManager && address) {
      const isAdmin: boolean = (await airdropManager?.isAdmin(
        address
      )) as boolean
      setIsAdmin(isAdmin)
    }
    setAirdrops(airdropsDetail)
    setAirdropLoading(false)
  }, [initializeProvider, setAirdropLoading, setIsAdmin, address, setAirdrops])

  const removeAirdrop = async (airdropAddress: string) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET)
      const response = await airdropManager?.removeAirdrop(airdropAddress)
      setIsLoading(FETCH_STATUS.WAIT_TX)
      setTx(response)
      await response?.wait()
      // await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
      setIsLoading(FETCH_STATUS.COMPLETED)
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const addAirdrop = async (address: string) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET)
      const response = await airdropManager?.addAirdrop(address)
      setIsLoading(FETCH_STATUS.WAIT_TX)
      setTx(response)
      await response?.wait()
      setIsLoading(FETCH_STATUS.COMPLETED)
    } catch (error) {
      console.log('error: ', error)
      setIsLoading(FETCH_STATUS.ERROR)
    }
  }
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  const claim = async (
    airdropAddress: string,
    amount: string = '0',
    proof: string[] = [],
    gasless: boolean = false
  ) => {
    console.log('gasless: ', gasless);
    console.log('proof: ', proof);
    console.log('amount: ', amount);
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET)
      if (gasless) {
        const metamaskProvider = await MetaMaskWalletProvider.connect()
        const bundlerApiKey = BUNDLER_API_KEY
        const customBundlerUrl = CUSTOM_BUNDLER_URL
        const chainId = Number(CHAIN_ID)
        const airdropManagerAddress = AIRDROP_MANAGER_ADDRESS
        const apiKey = ARKA_PUBLIC_KEY
        if (
          !metamaskProvider ||
          !bundlerApiKey ||
          !customBundlerUrl ||
          !chainId ||
          !airdropManagerAddress ||
          !apiKey
        ) {
          throw new Error('Missing data for GaslessClaimer execution')
        }
        const primeSdk = new PrimeSdk(metamaskProvider, {
          chainId: chainId,
          bundlerProvider: new EtherspotBundler(
            chainId,
            bundlerApiKey,
            customBundlerUrl
          ),
        })
        const airdropAdminContract = new ethers.Contract(
          airdropManagerAddress,
          AirdropAdminAbi.abi
        )
        const encodedData = airdropAdminContract.interface.encodeFunctionData(
          'claim',
          [airdropAddress, address, amount, proof]
        )
        await primeSdk.addUserOpsToBatch({
          to: airdropManagerAddress,
          data: encodedData,
        })
        const op = await primeSdk.estimate({
          paymasterDetails: {
            url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${chainId}`,
            context: { mode: 'sponsor' },
          },
        })
        const uoHash = await primeSdk.send(op)
        let userOpsReceipt = null
        const timeout = Date.now() + 120000 // 2 minutes timeout
        setIsLoading(FETCH_STATUS.WAIT_TX)
        while (userOpsReceipt == null && Date.now() < timeout) {
          console.log('Waiting for transaction...')
          await wait(5000)
          userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash)
        }
        console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt)
        setIsLoading(FETCH_STATUS.COMPLETED)
      } else {
        const response = await airdropManager?.claim(
          airdropAddress,
          address,
          amount,
          proof
        )
        setIsLoading(FETCH_STATUS.WAIT_TX)
        setTx(response)
        await response?.wait()
        setIsLoading(FETCH_STATUS.COMPLETED)
      }
    } catch (error) {
      console.log('error: ', error)
      setIsLoading(FETCH_STATUS.ERROR)
    }
  }
  const allowedAddress = async (
    airdropAddress: string,
    walletAddress: string
  ) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET)
      const response = await airdropManager?.allowAddress(
        airdropAddress,
        walletAddress
      )
      setTx(response)
      setIsLoading(FETCH_STATUS.WAIT_TX)
      await response?.wait()
      setIsLoading(FETCH_STATUS.COMPLETED)
    } catch (error) {
      console.log('error: ', error)
      setIsLoading(FETCH_STATUS.ERROR)
    }
  }
  return {
    removeAirdrop,
    addAirdrop,
    getAllAirdrops,
    isLoading,
    setIsLoading,
    claim,
    allowedAddress,
  }
}

export default useAirdrop
