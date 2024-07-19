import React, { useState } from 'react'
import AirdropDialog from '../dialog/AirdropDialog'
import AirdropCard from './AirdropCard'
import { IAirdrop } from '@/hooks/useAirdrop'
import DeleteAirdropDialog from '../dialog/DeleteAirdropDialog'
import { useAuth } from '@/context/AuthContext'

type props = {
  background: string
  airdrop: IAirdrop
}

function AirdropItem({ background, airdrop }: props) {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const { setAirdrop } = useAuth();
  return (
    <>
      <DeleteAirdropDialog open={deleteDialog} closeDialog={() => setDeleteDialog(false)} airdrop={airdrop}/>
      <AirdropDialog open={dialog} closeDialog={() => setDialog(false)} />
      <AirdropCard
        airdrop={airdrop}
        background={background}
        onClick={() => { setDialog(true); setAirdrop(airdrop); }}
        onCloseDialog={() => { setDeleteDialog(true); setAirdrop(airdrop); }}
      />
    </>
  )
}

export default AirdropItem
