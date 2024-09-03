'use client'
import AirdropItem from './AirdropItem'
import useAirdrop from '@/hooks/useAirdrop'
import Filters from './Filters';
import CardLoader from '../loader/CardLoader';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { IAirdrop } from '@/interface/IAirdrop';

function AirdropContainer() {
  const colors = ['bg-custom-orange', 'bg-custom-green', 'bg-custom-pink'];
  const [filters, setFilters] = useState("")
  const { provider, airdropLoading, airdrops } = useAuth();
  const { getAllAirdrops } = useAirdrop();
  const [currrentAirdrops, setCurrentAirdrops] = useState(airdrops)

  useEffect(() => {
    if (airdrops && !filters) {
      setCurrentAirdrops(airdrops)
    }

    if (airdrops && filters) {
      const s: IAirdrop[] = airdrops!.filter((airdrop: IAirdrop) => airdrop.name.toLocaleLowerCase().includes(filters.toLocaleLowerCase()))
      setCurrentAirdrops(s)
    }
  }, [airdrops, filters]);

  useEffect(() => {
    getAllAirdrops();
  }, [provider, getAllAirdrops]);

  return (
    <div className="lg:w-[90%] xl:w-[1300px] m-auto mt-[90px]">
      <Filters filters={filters} setFilters={setFilters} />
      <div className='mt-16 flex flex-wrap gap-6'>
        {airdropLoading ? (
          <CardLoader />
        ) : (
          currrentAirdrops?.map((air, i) =>
            <AirdropItem
              airdrop={air}
              key={i}
              background={`${colors[i % colors.length]}`}
            />
          )
        )
        }
        {
          (airdrops?.length === 0 && !airdropLoading) && (
            <div className='w-full flex justify-center mt-10'>
              <span className='text-6xl italic text-zinc-800'>No AirDrops</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AirdropContainer
