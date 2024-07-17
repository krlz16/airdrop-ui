import React, { useState } from 'react'
import Button from '../common/Button'
import Search from './Search'
import FilterIcon from '../icons/FilterIcon'
import AddAirdropDialog from '../dialog/AddAirdropDialog'
import { useAuth } from '@/context/AuthContext'

function Filters() {
  const [dialog, setDialog] = useState<boolean>(false);
  const { address } = useAuth();
  return (
    <>
      <AddAirdropDialog open={dialog} closeDialog={() => setDialog(false)} />
      <div className="flex justify-between items-center">
        <div className='flex gap-2'>
          <Search />
          {
            address &&
            <Button
              onClick={() => setDialog(true)}
              outline
              rounded
              variant='secondary'
              width={170}
            >
              <span className='text-xl font-semibold'>Add Airdrop +</span>
            </Button>
          }
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <FilterIcon />
            <span className="text-xl text-white font-medium">Filter By</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filters
