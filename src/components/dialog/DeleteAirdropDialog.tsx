import React from 'react'
import BaseDialog from './BaseDialog'
import useAirdrop, { IAirdrop } from '@/hooks/useAirdrop'
import Button from '../common/Button'
import { FETCH_STATUS } from '@/constants'
import ContentDialog from './ContentDialog'

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
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[380px] h-[270px]'>
      <ContentDialog
        initialContent={
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
        status={isLoading}
        loadingTitle='Deleting AirDrop'
        createdTitle='AirDrop was deleted'
        onClose={() => handleCloseDialog()}
      />
    </BaseDialog>
  )
}

export default DeleteAirdropDialog
