import BaseDialog from './BaseDialog'
import Input from '../common/Input'
import Button from '../common/Button'
import useAirdrop from '@/hooks/useAirdrop'
import { FETCH_STATUS } from '@/constants'
import { ChangeEvent, useEffect, useState } from 'react'
import ContentDialog from './ContentDialog'
import { ICreateAirdrop } from '@/interface/IAirdrop'
import { useAuth } from '@/context/AuthContext'

type props = {
  open: boolean
  closeDialog: Function
}
const CREATE_AIRDROP_STATE: ICreateAirdrop = {
  name: '',
  tokenAddress: '',
  totalAmount: 0,
  claimAmount: 0,
  expirationDate: ''
}

function AddAirdropDialog({ open, closeDialog }: props) {
  const { isLoading, addAirdrop, setIsLoading, getAllAirdrops, deployERC20Airdrop } = useAirdrop();
  const { isAdmin, address,  gasless, setGasless  } = useAuth();
  const [menu, setMenu] = useState<'add'| 'create'>('add');
  const [formCompleted, setFormCompleted] = useState<boolean>(true);
  const [createAirdrop, setCreateAirdrop] = useState<ICreateAirdrop>(CREATE_AIRDROP_STATE);
  const [contractAddress, setContractAddress] = useState<string>('');

  useEffect(() => {
    setMenu(isAdmin ? 'add' : 'create');
  }, [isAdmin, address]);

  const handleAddAirdrop = () => {
    if (!contractAddress) return
    addAirdrop(contractAddress);
  }
  const handleCloseDialog = () => {
    closeDialog();
    setIsLoading(FETCH_STATUS.INIT);
    setContractAddress('');
    setCreateAirdrop(CREATE_AIRDROP_STATE);
    setFormCompleted(true);
  }
  const handleReset = () => {
    if (isLoading === FETCH_STATUS.COMPLETED) {
      closeDialog();
      getAllAirdrops();
      setContractAddress('');
    }
    setIsLoading(FETCH_STATUS.INIT);
  }

  const areAllFieldsFilled = () => {
    return Object.values(createAirdrop).every(value => value !== '' && value !== 0);
  };

  const handleFormCreateAirdrop = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateAirdrop((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setFormCompleted(true);
  }

  const createNewAirdrop = async () => {
    setFormCompleted(areAllFieldsFilled());
    if (areAllFieldsFilled()) {
      await deployERC20Airdrop(createAirdrop);
    }
  }
  return (
    <BaseDialog open={open} closeDialog={handleCloseDialog} className={`${menu === 'add' ? 'w-[430px] h-[370px]' : 'w-[700px] h-[450px]'} bg-black border border-zinc-700 transition-all duration-200`}>
      <div className='w-full h-full flex flex-col'>
        {
          isAdmin && <ul className='flex gap-4 mb-5'>
            <li className={`cursor-pointer hover:text-zinc-300 text-sm font-medium text-zinc-400 mb-3 pb-1 ${menu === 'add' ? 'border-b-2': ''}`}>
              <button onClick={() => setMenu('add')}>
                Add AirDrop
              </button>
            </li>
            {
              <li className={`cursor-pointer hover:text-zinc-300 text-sm font-medium text-zinc-400 mb-3 ${menu === 'create' ? 'border-b-2': ''}`}>
                <button onClick={() => setMenu('create')}>
                  Create AirDrop
                </button>
              </li>
            }
          </ul>
        }
        {
          menu === 'add' &&
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
                      name='name'
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
              createdTitle='AirDrop was added'
              onClose={() => handleReset()}
              btnError='try again'
            />
        }
        {
          menu === 'create' &&
          <ContentDialog
            initialContent={
              <>
                <h2 className='bg-custom-green mt-1 font-bold text-xl text-black w-max px-1 items-start'>CREATE AIRDROP</h2>
                <form className='w-full mt-9 items-center flex flex-wrap'>
                  <div className='w-1/2 p-1'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-1 block'>Airdrop Name</label>
                    <Input
                      name="name"
                      value={createAirdrop.name}
                      onChange={(e) => handleFormCreateAirdrop(e)}
                      id='name'
                      placeholder='name'
                      height={35}  
                    />
                  </div>
                  <div className='w-1/2 p-2'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-1 block'>Token Address</label>
                    <Input
                      value={createAirdrop.tokenAddress}
                      onChange={(e) => handleFormCreateAirdrop(e)}
                      id='tokenAddress'
                      name='tokenAddress'
                      placeholder='Token address'
                      height={35}  
                    />
                  </div>
                  <div className='w-1/2 p-2'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-1 block'>Total amount</label>
                    <Input
                      type='number'
                      value={createAirdrop.totalAmount}
                      onChange={(e) => handleFormCreateAirdrop(e)}
                      id='totalAmount'
                      name='totalAmount'
                      placeholder='Total amount'
                      height={35}  
                    />
                  </div>
                  <div className='w-1/2 p-2'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-1 block'>Claim amount</label>
                    <Input
                      type='number'
                      value={createAirdrop.claimAmount}
                      onChange={(e) => handleFormCreateAirdrop(e)}
                      id='claimAmount'
                      name='claimAmount'
                      placeholder='Claim amount'
                      height={35}  
                    />
                  </div>
                  <div className='w-1/2 p-2'>
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-1 flex justify-between items-center'>
                      Expiration Date
                      <span className='text-zinc-600 text-xs mr-2'>Time Zone GMT+0</span>
                    </label>
                    <Input
                      type='datetime-local'
                      value={createAirdrop.expirationDate}
                      onChange={(e) => handleFormCreateAirdrop(e)}
                      id='expirationDate'
                      name='expirationDate'
                      placeholder='contract address'
                      height={35}  
                    />
                  </div>
                  <div className="w-1/2 p-2">
                    <label htmlFor="name" className='font-bold text-base ml-3 mb-2 block'>Gasless</label>
                    <div className='ml-2'>
                      <label className="flex w-max relative items-center cursor-pointer">
                        <input
                          checked={gasless}
                          type="checkbox"
                          className="sr-only"
                          onChange={(e) => setGasless(Boolean(e.target.checked))}
                        />
                        <span className="w-9 h-5 bg-card rounded-full border border-input toggle-bg"></span>
                      </label>
                    </div>
                  </div>
                </form>
                <div className='italic text-red-500 my-2'>
                  {
                    !formCompleted && 'All fields are required'
                  }
                </div>
                <div className='w-full flex mt-7 px-2 justify-between'>
                  <Button
                    outline
                    onClick={() => handleCloseDialog()}
                    width={80}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => createNewAirdrop()}
                    variant='secondary'
                    outline
                    width={140}
                  >
                    Create Airdrop
                  </Button>
                </div>
              </>
            }
            status={isLoading}
            loadingTitle='Creating airdrop'
            createdTitle='Airdrop was Created'
            onClose={() => handleReset()}
            btnError='try again'
          />
        }
      </div>
    </BaseDialog>
  )
}

export default AddAirdropDialog
