import React, { useState } from 'react'
import Button from '../common/Button'
import XIcon from '../icons/XIcon'
import ProgressBar from './ProgressBar'
import AirdropIcon from '../icons/AirdropIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import DeleteAirdropDialog from '../dialog/DeleteAirdropDialog'
import { IAirdrop } from '@/hooks/useAirdrop'
import { useAuth } from '@/context/AuthContext'

type props = {
  progressValue: number
  background: string
  dialog?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  airdrop: IAirdrop
}

function AirdropCard({ progressValue = 0, background, onClick, dialog = false, airdrop }: props) {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const { address } = useAuth();
  return (
    <>
      <DeleteAirdropDialog open={deleteDialog} closeDialog={() => setDeleteDialog(false)} airdrop={airdrop}/>
      <article className={`rounded-[20px] justify-between gap-2 relative ${dialog ? ' w-full' : 'border border-white p-7 w-[400px]'}`}>
        {
          (!dialog && address) && 
            <Button
              onClick={() => setDeleteDialog(true)}
              className='!absolute -top-3 right-0 px-2 group'
              rounded
              variant='secondary'
              width={100}
              height={25}
            >
              <span className='flex items-center gap-2'>
                Remove <XIcon className='group-hover:stroke-white stroke-black' />
              </span>
            </Button>
        }
        <section className='flex w-full'>
          <div className='w-2/3'>
            <header>
              <h3 className={`${background} w-max font-semibold text-xl px-1 text-black`}>{ airdrop.name }</h3>
            </header>
            <ProgressBar value={progressValue} background={background} />
            <section className='w-[80%] mt-2'>
              <div className='font-semibold text-base flex justify-between'>
                <h4>Holders</h4>
                <p>TBD</p>
              </div>
              <div className='flex justify-between mt-2'>
                <h4>120</h4>
                <p>TBD</p>
              </div>
            </section>
          </div>
          <div className='w-1/3 flex justify-between flex-col items-end'>
            <AirdropIcon />
            <Button
              onClick={onClick}
              className='self-end !px-0 group'
              width={ dialog ? 70 : 45 }
              rounded
              outline
              variant={ dialog ? 'secondary' : 'primary'}
            >
              {
                dialog ? 'claim' : <ArrowRightIcon className='group-hover:fill-black fill-white' />
              }
            </Button>
          </div>
        </section>
        {
          dialog &&
            <section className='mt-5'>
              <h4 className='font-semibold text-sm'>Description</h4>
              <p className='text-xs text-zinc-400'>nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec</p>
            </section>
        }
      </article>
    </>
  )
}

export default AirdropCard
