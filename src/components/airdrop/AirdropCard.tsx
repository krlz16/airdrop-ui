import Button from '../common/Button'
import XIcon from '../icons/XIcon'
import ProgressBar from './ProgressBar'
import AirdropIcon from '../icons/AirdropIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import useAirdrop from '@/hooks/useAirdrop'
import { useAuth } from '@/context/AuthContext'
import ConnectWalletButton from '../navigation/ConnectWalletButton'
import Badge from '../common/Badge'
import { IAirdrop } from '@/interface/IAirdrop'

type props = {
  background?: string
  dialog?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement> | undefined
  airdrop: IAirdrop
}

function AirdropCard({ background = 'bg-custom-orange', onClick, dialog = false, airdrop, onCloseDialog }: props) {
  const { isAdmin, address } = useAuth();
  let disabled = false;
  if (address) disabled = !isAdmin ? (!airdrop.isAllowed || airdrop.isClaimed! || airdrop?.isExpired!) : false;
  return (
    <>
      <article className={`${(disabled && !dialog) ? 'cursor-not-allowed bg-zinc-950 border-zinc-700' : 'border-white'} rounded-[20px] justify-between gap-2 relative ${dialog ? 'w-full' : 'border p-7 w-[400px]'}`}>
        <div className={`!absolute -top-3 right-0 px-2 flex gap-2 ${!dialog ? '': 'hidden'}`}>
          {
            isAdmin && (
              <Button
                onClick={onCloseDialog}
                className='group'
                rounded
                variant='secondary'
                width={100}
                height={25}
              >
                <span className='flex items-center gap-2'>
                  Remove <XIcon className='group-hover:stroke-white stroke-black' />
                </span>
              </Button>
            )
          }
          {
            (!isAdmin && !airdrop.isAllowed && address) &&
              <Badge
                color='pink'
                title='claim no allowed'
              />
          }
          {
            (!isAdmin && airdrop.isClaimed && address) &&
            <Badge
              color='green'
              title='claimed'
            />
          }
          {
            (!isAdmin && airdrop.isExpired && address) &&
            <Badge
              color='lime'
              title='Expired'
            />
          }
        </div>
        <section className='flex w-full'>
          <div className='w-2/3'>
            <h3 className={`${background} w-max font-semibold text-xl px-1 text-black`}>{ airdrop.name }</h3>
            <ProgressBar value={airdrop.progress!} background={background} />
            <section className='w-full mt-2'>
              <div className='flex justify-between'>
                <h6>Amount to receive</h6>
                <p>{ airdrop.claimAmount }</p>
              </div>
              <div className='flex justify-between mt-2'>
                <h6>Total available</h6>
                <p>{ airdrop.airdropAmountLeft }</p>
              </div>
              <div className='text-zinc-500 font-semibold text-xs flex justify-between mt-2'>
                <h6>Expiration date</h6>
                <p>{ airdrop.expirationDate.toDateString() }</p>
              </div>
            </section>
          </div>
          <div className='w-1/3 flex justify-between flex-col items-end'>
            <AirdropIcon />
            <Button
              show={(!dialog || !!address)}
              onClick={onClick}
              className='self-end !px-0 group'
              width={ dialog ? 76 : 45 }
              outline
              variant={ dialog ? 'secondary' : 'primary'}
              disabled={disabled}
            >
              {
                dialog
                ? 'claim' 
                : <ArrowRightIcon className={`${disabled ? '' : 'group-hover:fill-black'} fill-white`} />
              }
            </Button>
          </div>
        </section>
        <section className={`flex justify-center mt-8 ${!(!address && dialog) ? 'hidden': ''}`}>
          <ConnectWalletButton title='Connect wallet to claim' width={230} />
        </section>
        <section className={`mt-7 ${dialog ? '': 'hidden'}`}>
          <h4 className='font-semibold text-sm'>Description</h4>
          <p className='text-xs text-zinc-400'>nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec</p>
        </section>
      </article>
    </>
  )
}

export default AirdropCard
