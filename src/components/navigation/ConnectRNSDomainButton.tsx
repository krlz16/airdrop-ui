'use client'
import React, { useState } from 'react'
import Button from '../common/Button'
import RifIcon from '../icons/RifIcon'
import ConnectRNSDomainDialog from '../dialog/ConnectRNSDomainDialog'

type props = {
  title?: string
  width?: number
}

const ConnectRNSDomainButton = ({ title = 'Use RNS domain', width = 200 }: props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <>
      {dialog && (
        <ConnectRNSDomainDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
        />
      )}
      <Button
        variant='primary'
        outline
        onClick={() => setDialog(true)}
        width={width}
      >
        <span className='flex justify-center items-center'>
          <RifIcon className="w-5 mr-2" /> { title }
        </span>
      </Button>
    </>
  )
}

export default ConnectRNSDomainButton
