'use client'
import React, { useState } from 'react'
import MetamaskIcon from '../icons/MetamaskIcon'
import ConnectWalletDialog from '../dialog/ConnectWalletDialog'
import Button from '../common/Button'

const ConnectWalletButton: React.FC = () => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <>
      {dialog && (
        <ConnectWalletDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
        />
      )}
      <Button
        variant='primary'
        outline
        onClick={() => setDialog(true)}
        width={200}
      >
        <span className='flex justify-center items-center'>
          <MetamaskIcon className="w-5 mr-2" /> Connect wallet
        </span>
      </Button>
    </>
  )
}

export default ConnectWalletButton
