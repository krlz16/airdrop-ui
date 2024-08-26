import React from 'react'

function Title() {
  return (
    <h1 className='text-7xl font-bold text-black gap-3 leading-tight flex flex-col'>
      <span className='flex gap-3'>
        <span className='bg-custom-orange'>Runes</span>
        <span className='bg-custom-pink'>giveaway</span>
      </span>
      <span className='bg-custom-green w-max'>machine</span>
      <span className='flex gap-3'>
        <span className='bg-custom-cyan'>Airdrop</span>
        <span className='bg-custom-lime'>claim</span>
      </span>
    </h1>
  )
}

export default Title
