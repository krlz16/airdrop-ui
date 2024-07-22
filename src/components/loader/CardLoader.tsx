import React from 'react'

function CardLoader() {
  return (
    <>
      {
        [0,1,2].map((i) => (
        <div key={i} className='w-[350px] h-[200px] p-6 animate-pulse border rounded-2xl'>
          <div className='flex h-full'>
            <div className='flex flex-col gap-2 w-3/4'>
              <div className='w-[50%] py-2 bg-zinc-800 rounded-full'></div>
              <div className='w-[80%] mt-4 py-2 bg-zinc-800 rounded-full'></div>
              <div className='w-[70%] py-2 bg-zinc-800 rounded-full'></div>
              <div className='w-[70%] mt-4 py-1 bg-zinc-800 rounded-full'></div>
            </div>
            <div className='w-1/4 flex flex-col justify-between'>
              <div className='w-16 h-16 py-2 bg-zinc-800 rounded-full'></div>
              <div className='w-[60%] py-4 bg-zinc-800 rounded-3xl self-end'></div>
            </div>
          </div>
        </div>
        ))
      }
    </>
  )
}

export default CardLoader
