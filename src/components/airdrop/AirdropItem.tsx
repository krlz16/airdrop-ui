import React, { useState } from 'react'
import AirdropDialog from '../dialog/AirdropDialog'
import AirdropCard from './AirdropCard'
import { IAirdrop } from '@/hooks/useAirdrop'

type props = {
  progressValue: number
  background: string
  airdrop: IAirdrop
}

function AirdropItem({ progressValue = 0, background, airdrop }: props) {
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <>
      <AirdropDialog open={dialog} closeDialog={() => setDialog(false)}>
        <AirdropCard
          airdrop={airdrop}
          dialog={dialog}
          background={background}
          progressValue={progressValue}
          onClick={() => setDialog(true)}
        />
      </AirdropDialog>
      <AirdropCard
        airdrop={airdrop}
        background={background}
        progressValue={progressValue}
        onClick={() => setDialog(true)}
      />
    </>
  )
}

export default AirdropItem
