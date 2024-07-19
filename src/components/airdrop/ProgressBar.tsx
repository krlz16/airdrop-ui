import React from 'react'

function ProgressBar({ value = 0, background = 'bg-custom-orange' }: { value: number, background: string }) {
  return (
    <div className='mt-2'>
      <div className='font-semibold text-base'>Progress</div>
      <div className='flex items-center gap-2'>
        <div className='bg-white w-full h-1 rounded-full'>
          <div style={{ width: `${value}%` }} className={`h-1 rounded-full ${background}`}></div>
        </div>
        {value}%
      </div>
    </div>
  )
}

export default ProgressBar
