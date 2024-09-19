import React, { useEffect, useState } from 'react'
import BaseDialog from './BaseDialog'
import RifIcon from '../icons/RifIcon'
import { HelpCircleIcon } from '../icons/HelpCircleIcon'
import Button from '../common/Button'
import useConnectRNSDomain from '@/hooks/useConnectRNSDomain'
import Tooltip from '../common/Tooltip'
import { useAuth } from '@/context/AuthContext'

type props = {
  closeDialog: Function
  open: boolean
}

const RSK_SUFIX = ".rsk"

function ConnectRNSDomainDialog({ closeDialog, open }: props) {
  const { search, isError, setIsError } = useConnectRNSDomain()
  const { address, domain } = useAuth()

  const [domainInput, setDomainInput] = useState<string>("")
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(false)

    if(address && domain){
      closeDialog()
      setIsError(false)
      console.log(domain)
    }
  }, [address, domain])

  useEffect(()=> {
    if(isError) {
      setIsError(false)
    }
  }, [isError])

  const handleSubmit = () => {
    // TODO domain validations 

    setIsSearching(true)

    try {
      setTimeout(() => {
        search(domainInput + RSK_SUFIX)
      }, 1500)
    } catch (error: any) {
      setIsSearching(false)
      setIsError(true)
      console.log('error: ', error)
    }
  }

  return (
    <BaseDialog
      closeDialog={closeDialog}
      open={open}
      className="w-[500px] h-[350px]"
    >

      {isSearching ?
        (
          <div>
            <h2 className="text-2xl text-slate-100 text-center font-semibold mb-6 mt-6">
              Searching RNS domain
            </h2>
            <div className="relative flex justify-center items-center">
              <RifIcon className="w-[100px] h-[100px] absolute" />
              <div className="animate-spin border-r border-r-slate-300 w-[200px] h-[200px] rounded-full"></div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-slate-100 text-center font-semibold mb-6 mt-6">
              Use RNS domain to claim
            </h2>
            <div className="m-4">
              <div className="flex-row flex gap-2 items-center">
                <label htmlFor="name" className="block">
                  Domain
                </label>
                <Tooltip text="Enter your RNS domain to claim">
                  <HelpCircleIcon className="w-5 h-5" />
                </Tooltip>
              </div>
              <div className="relative mt-4 w-full ">
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  onChange={(e: any) => setDomainInput(e.target.value)}
                  className="w-full text-center px-10 py-3 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                />
                <span className="absolute right-6 inset-y-0 flex items-center font-semibold text-custom-pink">
                  .rsk
                </span>
              </div>
            </div>
            <div className='justify-center w-full s flex items-center my-8'>
              <Button
                variant='primary'
                outline
                onClick={handleSubmit}
                width={200}
              >
                <span className='flex justify-center items-center gap-2'>
                  <RifIcon className="w-5 h-5" />
                  <span>Use domain</span>
                </span>
              </Button>
            </div>
            <div className='h-full w-full ml-4 text-zinc-300 font-semibold text-xs '>
              <span>Don't you have your RNS domain yet? Go to  <a
                href="https://testnet.manager.rns.rifos.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-custom-orange mt-4"
              >
                RNS manager
              </a> and find if your name is still available.
              </span>

            </div>
          </div>
        )}
    </BaseDialog>
  )
}

export default ConnectRNSDomainDialog
