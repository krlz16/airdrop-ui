import Button from '../common/Button'
import XIcon from '../icons/XIcon'
import ProgressBar from './ProgressBar'
import AirdropIcon from '../icons/AirdropIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import { useAuth } from '@/context/AuthContext'
import Badge from '../common/Badge'
import { IAirdrop } from '@/interface/IAirdrop'
import Connect from '../navigation/Connect'
import MerkleData from '@/utils/merkleData.json'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

type props = {
  background?: string
  dialog?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement> | undefined
  airdrop: IAirdrop
}

function AirdropCard({ background = 'bg-custom-orange', onClick, dialog = false, airdrop, onCloseDialog }: props) {
  const { isAdmin, address, gasless, setGasless } = useAuth();
  const [amount, setAmount] = useState<string>('0');
  let disabled = false;
  if (address) disabled = !isAdmin ? (!airdrop.isAllowed || airdrop.isClaimed! || airdrop?.isExpired! || airdrop.balance === 0) : false;
  useEffect(() => {
    if(airdrop.airdropType !== 'merkle') return;
    const claim = MerkleData.claims.find(claim => claim.address.toLowerCase() === address.toLowerCase());
    setAmount(claim?.amount ? ethers.formatUnits(claim?.amount, 18).toString() : '0');
  }, [address])
  return (
    <>
      <article className={`${(disabled && !dialog) ? 'cursor-not-allowed bg-zinc-950 border-zinc-700' : 'border-white'} rounded-[20px] justify-between gap-2 relative ${dialog ? 'w-full' : 'border p-7 w-[400px]'}`}>
        <div className={`!absolute -top-3 right-0 px-2 flex gap-2 ${!dialog ? '' : 'hidden'}`}>
          {
            (!airdrop.isAllowed && address) &&
            <Badge
              color='pink'
              title='claim no allowed'
            />
          }
          {
            (airdrop.isClaimed && address) &&
            <Badge
              color='green'
              title='claimed'
            />
          }
          {
            (airdrop.isExpired && address) &&
            <Badge
              color='lime'
              title='Expired'
            />
          }
          {
            (airdrop.balance === 0 && address) &&
            <Badge
              color='cyan'
              title='No Balance'
            />
          }
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
        </div>
        <section className='flex w-full'>
          <div className='w-2/3'>
            <h3 className={`${background} w-max font-semibold text-xl px-1 text-black`}>{airdrop.name}</h3>
            <ProgressBar value={airdrop.progress!} background={background} />
            <section className='w-full mt-2'>
              <div className='flex justify-between'>
                <h6>Amount to receive</h6>
                <p>{airdrop.airdropType === 'merkle' ? amount : airdrop.claimAmount }</p>
              </div>
              <div className='flex justify-between mt-2'>
                <h6>Total available</h6>
                <p>{airdrop.airdropAmountLeft}</p>
              </div>
              <div className='text-zinc-500 font-semibold text-xs flex justify-between mt-2'>
                <h6>Expiration date</h6>
                <p>{airdrop.expirationDate.toDateString()}</p>
              </div>
              <div className='text-zinc-500 font-semibold text-xs flex justify-between mt-1'>
                <h6>Type</h6>
                <p>{airdrop.airdropType}</p>
              </div>
            </section>
          </div>
          <div className='w-1/3 flex justify-between flex-col items-end'>
            <AirdropIcon />
            <Button
              show={(!dialog || !!address)}
              onClick={onClick}
              className='self-end !px-0 group'
              width={dialog ? 76 : 45}
              outline
              variant={dialog ? 'secondary' : 'primary'}
              disabled={disabled}
            >
              {
                dialog
                  ? 'claim'
                  : <ArrowRightIcon className={`${disabled ? '' : 'group-hover:fill-black'} fill-white`} />
              }
            </Button>
            {
              (dialog && address) &&
              <div className="flex gap-2 items-center">
                <label htmlFor="">gasless</label>
                <label className="flex relative items-center cursor-pointer">
                  <input
                    checked={gasless}
                    type="checkbox"
                    className="sr-only"
                    onChange={(e) => setGasless(Boolean(e.target.checked))}
                  />
                  <span className="w-9 h-5 bg-card rounded-full border border-input toggle-bg"></span>
                </label>
              </div>
            }
          </div>
        </section>
        <section className={`mt-8 ${!(!address && dialog) ? 'hidden' : ''}`}>
          <Connect className='flex gap-4 flex-col w-full items-center justify-center' connectWalletTitle='Connect wallet to claim' connectRNSTitle="Use RNS to claim" />
        </section>
        <section className={`mt-7 ${dialog ? '' : 'hidden'}`}>
          <h4 className='font-semibold text-sm'>Description</h4>
          <p className='text-xs text-zinc-400'>nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec</p>
        </section>
      </article>
    </>
  )
}

export default AirdropCard
