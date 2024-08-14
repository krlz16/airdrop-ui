import React, { useState } from 'react'
import BaseDialog from './BaseDialog'
import Button from '../common/Button'
import Input from '../common/Input'
import ContentDialog from './ContentDialog'
import { useAuth } from '@/context/AuthContext'
import useAirdrop from '@/hooks/useAirdrop'
import { FETCH_STATUS } from '@/constants'
import AirdropCard from '../airdrop/AirdropCard'

type props = {
  open: boolean,
  closeDialog: Function
}
function AirdropDialog({ open, closeDialog }: props) {
  const [menu, setMenu] = useState<'airdrop'| 'allow'>('airdrop');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const { isAdmin, airdrop, gasless } = useAuth();
  const { allowedAddress, isLoading, setIsLoading, claim, getAllAirdrops } = useAirdrop();

  const handleAllowedAddress = () => {
    if (!walletAddress) return
    allowedAddress(airdrop?.address!, walletAddress);
  }

  const handleCloseDialog = () => {
    closeDialog();
    setIsLoading(FETCH_STATUS.INIT);
    setMenu('airdrop');
    setWalletAddress('');
  }
  const handleReset = () => {
    if (isLoading === FETCH_STATUS.COMPLETED) {
      closeDialog();
      getAllAirdrops();
    }
    setIsLoading(FETCH_STATUS.INIT);
    setWalletAddress('');
  }
  return (
    <BaseDialog open={open} closeDialog={handleCloseDialog} className={`w-[450px] ${isAdmin ? 'h-[410px]' : 'min-h-[360px]'} ${isLoading !== FETCH_STATUS.INIT && 'h-[360px]'}`}>
      <div className={`w-full h-full flex flex-col ${!isAdmin && 'pt-4'}`}>
        {
          isAdmin && 
          <ul className='flex gap-4 mb-5'>
            <li className={`cursor-pointer hover:text-zinc-300 text-sm font-medium text-zinc-400 mb-3 pb-1 ${menu === 'airdrop' ? 'border-b-2': ''}`}>
              <button onClick={() => setMenu('airdrop')}>
                AirDrop
              </button>
            </li>
            {
              airdrop?.airdropType === 'custom' &&
              <li className={`cursor-pointer hover:text-zinc-300 text-sm font-medium text-zinc-400 mb-3 ${menu === 'allow' ? 'border-b-2': ''}`}>
                <button onClick={() => setMenu('allow')}>
                  Allowed wallets
                </button>
              </li>
            }
          </ul>
        }
        {
          menu === 'airdrop' ?
            <ContentDialog
              initialContent={
                <AirdropCard
                  airdrop={airdrop!}
                  dialog={true}
                  onClick={() => claim(airdrop?.address!, airdrop?.merkle?.amount, airdrop?.merkle?.proof, gasless)}
                />
              }
              status={isLoading}
              loadingTitle='Claiming tokens'
              createdTitle='You have claimed your tokens'
              onClose={() => handleReset()}
              btnError='try again'
            />
          :
          <ContentDialog
            initialContent={
              <div className='flex flex-col justify-between w-full h-full'>
                <div className='w-full items-center'>
                  <h2 className='bg-custom-green font-bold text-xl text-black w-max px-1 m-auto'>ALLOWED ADDRESS</h2>
                  <form className='mt-6'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-3 block'>User address</label>
                    <Input
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      id='name'
                      placeholder='0x1234...'
                      height={40}  
                    />
                  </form>
                </div>
                <div className='w-full flex mt-16 justify-between'>
                  <Button
                    onClick={() => handleCloseDialog()}
                    width={80}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleAllowedAddress()}
                    variant='secondary'
                    outline
                    width={120}
                  >
                    Add address
                  </Button>
                </div>
              </div>
            }
            status={isLoading}
            loadingTitle='Adding wallet address'
            createdTitle='Wallet address added'
            onClose={() => handleReset()}
            btnError='try again'
          />
        }
      </div>
    </BaseDialog>
  )
}

export default AirdropDialog
