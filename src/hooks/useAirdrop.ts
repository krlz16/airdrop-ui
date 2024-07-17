'use client'
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
  const [airdrops, setAirdrops] = useState<IAirdrop[]>();

  useEffect(() => {
    getAirdropData();
  }, []);

  const getAirdropData = () => {
    setAirdrops(AIR_DROPS_DATA);
  }
  return {
    airdrops
  }
}

export default useAirdrop
