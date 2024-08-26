'use client'
import logo from '@/app/assets/img/logo.svg';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Connect from './Connect';
import Connected from './Connected';

function Navbar() {
  const { address } = useAuth();

  return (
    <nav className="w-full p-6 flex justify-between z-10 fixed bg-black border-b border-zinc-600">
      <Image src={logo.src} alt="logo" style={{ width: 'auto', height: 'auto' }} width={170} height={100} />
      {address ? (
        <Connected/>
      ) : (
        <Connect className='flex gap-3 flex-row w-full items-center justify-end' width={180} />
      )
      }
    </nav>
  )
}

export default Navbar
