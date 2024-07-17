import BaseDialog from './BaseDialog'
import Input from '../common/Input'
import Button from '../common/Button'
import useAirdrop from '@/hooks/useAirdrop'
import { FETCH_STATUS } from '@/constants'
import { useState } from 'react'

type props = {
  open: boolean
  closeDialog: Function
}
function AddAirdropDialog({ open, closeDialog }: props) {
  const { isLoading, addAirdrop, setIsLoading } = useAirdrop();
  const [airdropName, setAirdropName] = useState<string>();
  const handleCloseDialog = () => {
    closeDialog();
    setIsLoading(FETCH_STATUS.INIT);
  }
  return (
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[430px] h-[300px] bg-black border border-zinc-700'>
      <div className='flex flex-col justify-center w-full h-full items-center'>
      {
        isLoading === FETCH_STATUS.INIT &&
        <>
          <h2 className='bg-custom-green mt-1 font-bold text-xl text-black w-max px-1 items-start'>ADD AIRDROP</h2>
          <form className='w-full mt-7 items-center'>
            <label htmlFor="name" className='font-bold text-base ml-3 mb-3 block'>Airdrop Contract Address</label>
            <Input
              value={airdropName}
              onChange={(e) => setAirdropName(e.target.value)}
              id='name'
              placeholder='contract address'
              height={40}  
            />
          </form>
          <div className='w-full flex mt-16 justify-between'>
            <Button
              onClick={() => handleCloseDialog()}
              width={80}
            >
              Cancel
            </Button>
            <Button
              onClick={() => addAirdrop('a', 'a')}
              variant='secondary'
              outline
              width={120}
            >
              Add Airdrop
            </Button>
          </div>
        </>
      }
      {
        isLoading === FETCH_STATUS.LOADING &&
        <>
          <h2 className='bg-custom-pink px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            Adding Airdrop
          </h2>
          <div className='animate-spin border-r border-r-white w-16 h-16 rounded-full'></div>
        </>
      }
      {
        isLoading === FETCH_STATUS.COMPLETED &&
        <>
          <h2 className='bg-custom-green px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            Airdrop was created
          </h2>
          <Button
            onClick={() => handleCloseDialog()}
            width={80}
            variant='secondary'
          >
            Close
          </Button>
        </>
      }
      </div>
    </BaseDialog>
  )
}

export default AddAirdropDialog
