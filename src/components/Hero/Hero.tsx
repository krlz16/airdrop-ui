import React from 'react'
import Title from './Title'
import Button from '@/components/common/Button'
import WorldIcon from '@/components/icons/WorldIcon'
import ArrowDownIcon from '../icons/ArrowDownIcon'

function Hero() {
  return (
    <header className='h-[calc(100vh-8vh)] flex w-full items-center lg:w-[90%] xl:w-[1300px] m-auto'>
      <div className='w-full h-full flex flex-col justify-evenly'>
        <div className='flex items-center gap-3'>
          <div className='flex-1'>
            <Title />
            <div className='flex justify-between mt-14 items-center'>
              <div className='w-[345px] font-medium'>
                <span className='bg-custom-orange w-[60px] h-[14px] rounded-full px-1 text-black'>WHAT IS?</span>
                <p className='mb-3 mt-4'>Welcome to the Runes Giveaway Machine! Airdrop Section, claim unique airdrops on RSK Network</p>
              </div>
            </div>
          </div>
          <WorldIcon />
        </div>
        <a href='#airdrop-content' className='flex justify-center mt-16'>
          <ArrowDownIcon className='animate-bounce' />
        </a>
      </div>
    </header>
  )
}

export default Hero
