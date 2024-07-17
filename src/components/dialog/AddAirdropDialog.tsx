import BaseDialog from './BaseDialog'
import Input from '../common/Input'
import Button from '../common/Button'

type props = {
  open: boolean
  closeDialog: Function
}
function AddAirdropDialog({ open, closeDialog }: props) {

  return (
    <BaseDialog open={open} closeDialog={closeDialog} className='w-[430px] min-h-[300px] bg-black border border-zinc-700'>
      <h2 className='bg-custom-green mt-1 font-bold text-xl text-black w-max m-auto px-1'>ADD AIRDROP</h2>
      <form className='w-full mt-5 items-center h-full'>
        <label htmlFor="name" className='font-bold text-base ml-3 mb-1'>Name</label>
        <Input
          id='name'
          placeholder='Airdrop name'
          height={40}  
        />
        <label htmlFor="address" className='font-bold text-base ml-3 mb-1 mt-5 block'>Contract address</label>
        <Input
          id='address'
          placeholder='0x233...4f2'
          height={40}  
        />
        <label htmlFor="aidrop" className='font-bold text-base ml-3 mb-1 mt-5 block'>Aidrop implementation</label>
        <Input
          id='aidrop'
          placeholder='Aidrop implementation'
          height={40}  
        />
        <label htmlFor="aidrop" className='font-bold text-base ml-3 mb-1 mt-5 block'>TBD</label>
        <Input
          placeholder='TBD'
          height={40}  
        />
        <Button
          className='mt-5 m-auto'
          onClick={() => null}
          rounded
          outline
          variant='secondary'
        >
          Add Airdrop
        </Button>
      </form>
    </BaseDialog>
  )
}

export default AddAirdropDialog
