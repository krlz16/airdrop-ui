'use client'
import { AIRDROP_MANAGER_ADDRESS, FETCH_STATUS } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { IAirdrop } from '@/interface/IAirdrop';
import { AirdropManager, AirdropManager__factory } from '@/typechain-types';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

const useAirdrop = () => {
  const RPC_PROVIDER = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
  let PROVIDER: ethers.JsonRpcSigner | ethers.JsonRpcProvider = RPC_PROVIDER;

  const [isLoading, setIsLoading] = useState(FETCH_STATUS.INIT);
  const [airdrops, setAirdrops] = useState<IAirdrop[]>();
  const [airdropManager, setAirdropManager] = useState<AirdropManager>();
  const { provider, address, setIsAdmin, setTx, setAirdropLoading } = useAuth();

  const initializeProvider = useCallback(async() => {
    if (provider) {
      PROVIDER = await provider.getSigner();
    }
    const airdropManager = AirdropManager__factory.connect(AIRDROP_MANAGER_ADDRESS!, PROVIDER);
    setAirdropManager(airdropManager);
    return airdropManager;
  },[provider]);

  useEffect(() => {
    initializeProvider();
  },[provider]);

  const getAllAirdrops = async () => {
    setAirdropLoading(true);
    const airdropManager = await initializeProvider();
    console.log('airdropManager: ', airdropManager);
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
    if (airdropManager && address) {
      const isAdmin:boolean = await airdropManager?.isAdmin(address) as boolean;
      setIsAdmin(isAdmin);
      console.log('isAdmin: ', isAdmin);
    };
    setAirdrops(airdropsDetail);
    setAirdropLoading(false);

  }
  const removeAirdrop = async (airdropAddress: string) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET);
      const response = await airdropManager?.removeAirdrop(airdropAddress);
      console.log('response: ', response);
      setIsLoading(FETCH_STATUS.WAIT_TX);
      setTx(response);
      await response?.wait();
      // await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
      setIsLoading(FETCH_STATUS.COMPLETED);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  const addAirdrop = async (address: string) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET);
      const response = await airdropManager?.addAirdrop(address);
      setIsLoading(FETCH_STATUS.WAIT_TX);
      setTx(response);
      await response?.wait();
      // await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
      setIsLoading(FETCH_STATUS.COMPLETED);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(FETCH_STATUS.ERROR);
    }
  }

  const claim = async (airdropAddress: string) => {
    console.log('airdropAddress: ', airdropAddress);
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET);
      const response = await airdropManager?.claim(airdropAddress, address);
      console.log('response: ', response);
      setIsLoading(FETCH_STATUS.WAIT_TX);
      setTx(response);
      await response?.wait();
      setIsLoading(FETCH_STATUS.COMPLETED);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(FETCH_STATUS.ERROR);
    }
  }
  const allowedAddress = async (airdropAddress:string, walletAddress:string) => {
    try {
      setIsLoading(FETCH_STATUS.WAIT_WALLET);
      const response = await airdropManager?.allowAddress(airdropAddress, walletAddress);
      console.log('response: ', response);
      setTx(response);
      setIsLoading(FETCH_STATUS.WAIT_TX);
      await response?.wait();
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
    allowedAddress,
  }
}

export default useAirdrop
