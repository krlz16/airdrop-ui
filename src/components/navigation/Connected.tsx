'use client'
import { useAuth } from '@/context/AuthContext'
import MetamaskIcon from '../icons/MetamaskIcon'
import RifIcon from '../icons/RifIcon'


const Connected = () => {
    const { address, logout, domain } = useAuth();

    const formatAddress = () => {
        return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
    }

    const extractRawDomain = () => {
        const match = domain.match(/(.*)(\.rsk)$/);

        return match![1]
    }

    return (
        <div className="flex gap-4">
            {domain ? (
                <div className="bg-white flex items-center text-center gap-3 rounded-md text-black px-3 py-2">
                    <RifIcon className="w-5 h-5" />
                    <div>
                        {extractRawDomain()}<span className='text-custom-pink font-semibold'>.rsk</span>
                    </div>
                </div>
            ) : (
                <div className="bg-white flex items-center gap-4 rounded-md text-black px-2 py-1">
                    <MetamaskIcon className="w-5 h-5" />
                    {formatAddress()}
                </div>
            )}
            <button
                onClick={logout}
                className="bg-card border border-border rounded-md px-4 hover:opacity-90"
            >
                logout
            </button>
        </div>
    )
}

export default Connected
