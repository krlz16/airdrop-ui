import React from 'react'
import BaseDialog from './BaseDialog'
import useAirdrop, { IAirdrop } from '@/hooks/useAirdrop'
import Button from '../common/Button'
import { FETCH_STATUS } from '@/constants'

type props = {
  open: boolean
  closeDialog: Function
  airdrop: IAirdrop
}
function DeleteAirdropDialog({ open, closeDialog, airdrop }: props) {
  const { removeAirdrop, isLoading, setIsLoading } = useAirdrop();
  const handleCloseDialog = () => {
    closeDialog();
    setIsLoading(FETCH_STATUS.INIT);
  }
  return (
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[350px] h-[300px]'>
      <div className='flex flex-col justify-center w-full h-full items-center'>
      {
        isLoading === FETCH_STATUS.INIT &&
        <>
          <p className='mt-2 w-[240px] text-sm font-medium text-center m-auto'>Are you sure you’d like to remove the airdrop</p>
          <h2 className='bg-custom-orange px-2 text-2xl text-black w-max text-center m-auto font-bold mt-10'>
            { airdrop.name }
          </h2>
          <div className='w-full flex mt-10 justify-between'>
            <Button
              onClick={() => handleCloseDialog()}
              width={80}
            >
              Cancel
            </Button>
            <Button
              onClick={() => removeAirdrop(airdrop.name)}
              variant='secondary'
              outline
              width={80}
            >
              Delete
            </Button>
          </div>
        </>
      }
      {
        isLoading === FETCH_STATUS.LOADING &&
        <>
          <h2 className='bg-custom-pink px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            Deleting Airdrop
          </h2>
          <div className='animate-spin border-r border-r-white w-16 h-16 rounded-full'></div>
        </>
      }
      {
        isLoading === FETCH_STATUS.COMPLETED &&
        <>
          <h2 className='bg-custom-green px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            Airdrop was deleted
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

export default DeleteAirdropDialog
