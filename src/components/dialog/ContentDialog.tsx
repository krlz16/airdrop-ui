import { FETCH_STATUS } from '@/constants'
import React from 'react'
import Button from '../common/Button'

type props = {
  status: number
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined
  loadingTitle: string
  createdTitle: string
  initialContent: React.ReactNode,
  btnError?: string
}
function ContentDialog({ status, onClose, loadingTitle, createdTitle, initialContent, btnError = 'Close' }: props) {
  return (
    <div className='flex flex-col justify-center w-full h-full items-center'>
      { status === FETCH_STATUS.INIT && initialContent}
      {
        status === FETCH_STATUS.LOADING &&
        <>
          <h2 className='bg-custom-pink px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            { loadingTitle }
          </h2>
          <div className='animate-spin border-r border-r-white w-16 h-16 rounded-full'></div>
        </>
      }
      {
        status === FETCH_STATUS.COMPLETED &&
        <>
          <h2 className='bg-custom-green px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            { createdTitle }
          </h2>
          <Button
            onClick={onClose}
            width={80}
            variant='secondary'
          >
            Close
          </Button>
        </>
      }
      {
        status === FETCH_STATUS.ERROR &&
        <>
          <h2 className='bg-custom-pink px-2 text-2xl text-black w-max text-center font-bold mb-10'>
            something was wrong
          </h2>
          <Button
            onClick={onClose}
            width={95}
            variant='secondary'
          >
            { btnError }
          </Button>
        </>
      }
    </div>
  )
}

export default ContentDialog
