'use client'
import { AIRDROP_MANAGER_ADDRESS, FETCH_STATUS } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { AirdropManager, AirdropManager__factory } from '@/typechain-types';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

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

function useAirdrop() {
  const RPC_PROVIDER = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)

  const [isLoading, setIsLoading] = useState(FETCH_STATUS.INIT);
  const [airdrops, setAirdrops] = useState<IAirdrop[]>();
  const [airdropManager, setAirdropManager] = useState<AirdropManager>();
  const { provider, address, setIsAdmin } = useAuth();

  useEffect(() => {
    setIsLoading(FETCH_STATUS.INIT);
    getAllAirdrops();
    isUserAdmin();
  }, [provider]);

  const getAllAirdrops = async () => {
    const airdropManager = AirdropManager__factory.connect(AIRDROP_MANAGER_ADDRESS!, RPC_PROVIDER);
    setAirdropManager(airdropManager);
    const items = await airdropManager?.getAirdrops();
    const airdropsDetail: IAirdrop[] = [];
    for (const air in items) {
      const detail = await airdropManager?.getAirdropInfo(items[Number(air)]);
      
      const newAirdrop: IAirdrop = {
        name: detail![0].toString(),
        address: detail![1].toString(),
        totalAirdropAmount: Number(ethers.formatEther(detail![2].toString())),
        airdropAmountLeft: Number(ethers.formatEther(detail![3].toString())),
        claimAmount: Number(ethers.formatEther(detail![4].toString())),
        expirationDate: new Date(parseFloat(detail![5].toString()) * 1000),
      }
      if (address){
        newAirdrop.isClaimed = await airdropManager.hasClaimed(items[Number(air)].toString(), address);
        newAirdrop.isAllowed = await airdropManager.isAllowed(items[Number(air)].toString(), address);
      } 
      const { airdropAmountLeft, totalAirdropAmount } = newAirdrop;
      const progress = (totalAirdropAmount - airdropAmountLeft) / totalAirdropAmount;
      newAirdrop.progress = Math.round(progress * 100);
      airdropsDetail.push(newAirdrop);
    }
    setAirdrops(airdropsDetail);
  }
  const removeAirdrop = async (airdropAddress: string) => {
    setIsLoading(FETCH_STATUS.LOADING);
    // await airdropManager?.removeAirdrop(airdropAddress);
    await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
    setIsLoading(FETCH_STATUS.COMPLETED);
  }
  const addAirdrop = async (address: string) => {
    try {
      setIsLoading(FETCH_STATUS.LOADING);
      await airdropManager?.addAirdrop(address);
      // await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
      setIsLoading(FETCH_STATUS.COMPLETED);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(FETCH_STATUS.ERROR)
    }
  }

  const isUserAdmin = async () => {
    if (!address) return;
    const isAdmin:boolean = await airdropManager?.isAdmin(address) as boolean;
    console.log('isAdmin: ', isAdmin);
    setIsAdmin(isAdmin);
  }
  const claim = async (airdropAddress: string) => {
    const response = await airdropManager?.claim(airdropAddress, address);
    console.log('response: ', response);
  }
  const allowedAddress = async (airdropAddress:string, walletAddress:string) => {
    console.log('walletAddress: ', walletAddress);
    console.log('airdropAddress: ', airdropAddress);
    try {
      setIsLoading(FETCH_STATUS.LOADING);
      await airdropManager?.allowAddress(airdropAddress, walletAddress);
      setIsLoading(FETCH_STATUS.COMPLETED);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(FETCH_STATUS.ERROR);
    }
  }
  return {
    airdrops,
    removeAirdrop,
    addAirdrop,
    getAllAirdrops,
    isLoading,
    setIsLoading,
    claim,
    allowedAddress
  }
}

export default useAirdrop
