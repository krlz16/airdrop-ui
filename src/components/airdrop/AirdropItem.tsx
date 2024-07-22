import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { IAirdrop } from '@/interface/IAirdrop'
import DeleteAirdropDialog from '../dialog/DeleteAirdropDialog'
import AirdropDialog from '../dialog/AirdropDialog'
import AirdropCard from './AirdropCard'

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
      <DeleteAirdropDialog open={deleteDialog} closeDialog={() => setDeleteDialog(false)} />
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
