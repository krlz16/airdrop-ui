import BaseDialog from './BaseDialog'
import Input from '../common/Input'
import Button from '../common/Button'
import useAirdrop from '@/hooks/useAirdrop'
import { FETCH_STATUS } from '@/constants'
import { useState } from 'react'
import ContentDialog from './ContentDialog'

type props = {
  open: boolean
  closeDialog: Function
}
function AddAirdropDialog({ open, closeDialog }: props) {
  const { isLoading, addAirdrop, setIsLoading } = useAirdrop();
  const [contractAddress, setContractAddress] = useState<string>('');
  const handleAddAirdrop = () => {
    if (!contractAddress) return
    addAirdrop(contractAddress);
  }
  const handleCloseDialog = () => {
    closeDialog();
    setIsLoading(FETCH_STATUS.INIT);
    setContractAddress('');
  }
  const handleReset = () => {
    setIsLoading(FETCH_STATUS.INIT);
  }
  return (
    <BaseDialog open={open} closeDialog={handleCloseDialog} className='w-[430px] h-[320px] bg-black border border-zinc-700'>
      <ContentDialog
        initialContent={
          <>
            <h2 className='bg-custom-green mt-1 font-bold text-xl text-black w-max px-1 items-start'>ADD AIRDROP</h2>
            <form className='w-full mt-7 items-center'>
              <label htmlFor="name" className='font-bold text-base ml-3 mb-3 block'>Airdrop Contract Address</label>
              <Input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
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
                onClick={() => handleAddAirdrop()}
                variant='secondary'
                outline
                width={120}
              >
                Add Airdrop
              </Button>
            </div>
          </>
        }
        status={isLoading}
        loadingTitle='Adding airdrop'
        createdTitle='AirDrop was Created'
        onClose={() => handleReset()}
        btnError='try again'
      />
    </BaseDialog>
  )
}

export default AddAirdropDialog
