import React from 'react'
import BaseDialog from './BaseDialog'
import { IAirdrop } from '@/hooks/useAirdrop'
import Button from '../common/Button'

type props = {
  open: boolean
  closeDialog: Function
  airdrop: IAirdrop
}
function DeleteAirdropDialog({ open, closeDialog, airdrop }: props) {
  return (
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[350px]'>
      <p className='mt-2 w-[240px] text-sm font-medium text-center m-auto'>Are you sure you’d like to remove the airdrop</p>
      <h2 className='bg-custom-orange px-2 text-2xl text-black w-max text-center m-auto font-bold mt-10'>
        { airdrop.name }
      </h2>
      <div className='w-full flex mt-10 justify-around'>
        <Button
          rounded
          onClick={() => closeDialog()}
          width={80}
        >
          Cancel
        </Button>
        <Button
          rounded
          onClick={() => closeDialog()}
          variant='secondary'
          outline
          width={80}
        >
          Delete
        </Button>
      </div>
    </BaseDialog>
  )
}

export default DeleteAirdropDialog
