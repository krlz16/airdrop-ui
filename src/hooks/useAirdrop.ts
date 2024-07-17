'use client'
import { AIRDROP_MANAGER_ADDRESS, FETCH_STATUS } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { AirdropManager, AirdropManager__factory } from '@/typechain-types';
import { useEffect, useState } from 'react';

export interface IAirdrop {
  name: string
  progress: number
  holders: number
}

const AIR_DROPS_DATA: IAirdrop[] = [
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  },
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  },
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  },
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  },
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  },
  {
    name: 'AIRDROP-NAME',
    progress: 20,
    holders: 20
  }
]

function useAirdrop() {
  const [isLoading, setIsLoading] = useState(FETCH_STATUS.INIT);
  const [airdrops, setAirdrops] = useState<IAirdrop[]>();
  const [airdropManager, setAirdropManager] = useState<AirdropManager>();
  const { provider, address, setIsAdmin } = useAuth();

  useEffect(() => {
    getAirdropData();
    instanceFactory();
    setIsLoading(FETCH_STATUS.INIT);
  }, [provider]);

  const getAirdropData = () => {
    setAirdrops(AIR_DROPS_DATA);
  }
  const instanceFactory = async () => {
    if (!provider) return;
    try {
      const airdropManager = AirdropManager__factory.connect(AIRDROP_MANAGER_ADDRESS!, provider);
      setAirdropManager(airdropManager);
      isUserAdmin();
      getAllAirdrops();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const removeAirdrop = async (address: string) => {
    setIsLoading(FETCH_STATUS.LOADING);
    await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
    setIsLoading(FETCH_STATUS.COMPLETED);
    // await airdropManager?.removeAirdrop(address);
  }
  const addAirdrop = async (address: string, name: string) => {
    // await airdropManager?.addAirdrop(address, name);
    setIsLoading(FETCH_STATUS.LOADING);
    await new Promise((resolve, reject) => setTimeout(() => resolve(''), 3000));
    setIsLoading(FETCH_STATUS.COMPLETED);
  }
  const getAllAirdrops = async () => {
    const airdrops = await airdropManager?.getAirdrops();
    console.log('airdrops: ', airdrops);
  }
  const isUserAdmin = async () => {
    if (!address) return;
    const isAdmin:boolean = await airdropManager?.isAdmin(address) as boolean;
    setIsAdmin(isAdmin);
  }
  const claim = async (airdropAddress: string) => {
    const response = await airdropManager?.claim(airdropAddress, address);
    console.log('response: ', response);
  }
  return {
    airdrops,
    removeAirdrop,
    addAirdrop,
    getAllAirdrops,
    isLoading,
    setIsLoading,
    claim
  }
}

export default useAirdrop
