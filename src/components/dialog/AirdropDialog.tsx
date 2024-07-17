import React from 'react'
import BaseDialog from './BaseDialog'
import Input from '../common/Input'

function AirdropDialog({ open, closeDialog, children }: { open: boolean, closeDialog: Function, children: React.ReactNode }) {
  return (
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[400px] min-h-[300px]'>
      <h4 className='text-xs font-medium text-zinc-400 mb-3'>Runes</h4>
      { children }
    </BaseDialog>
  )
}

export default AirdropDialog
