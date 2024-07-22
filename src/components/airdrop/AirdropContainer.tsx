'use client'
import AirdropItem from './AirdropItem'
import useAirdrop from '@/hooks/useAirdrop'
import Filters from './Filters';
import CardLoader from '../loader/CardLoader';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

function AirdropContainer() {
  const colors = ['bg-custom-orange', 'bg-custom-green', 'bg-custom-pink'];

  const { getAllAirdrops } = useAirdrop();
  const { provider, airdropLoading, airdrops } = useAuth();
  useEffect(() => {
    getAllAirdrops();
  }, [provider, getAllAirdrops]);

  return (
    <div className="lg:w-[90%] xl:w-[1300px] m-auto mt-[90px]">
      <Filters />
      <div className='mt-16 flex flex-wrap gap-6'>
        {airdropLoading ? (
          <CardLoader />
        ) :
          airdrops?.map((air, i) => 
            <AirdropItem
              airdrop={air}
              key={i}
              background={`${colors[i % colors.length]}`}
            />
          )
        }
      </div>
    </div>
  )
}

export default AirdropContainer
