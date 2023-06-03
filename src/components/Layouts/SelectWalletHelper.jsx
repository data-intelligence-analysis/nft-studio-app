import React from 'react'
import { ArrowUpLeftIcon } from '@heroicons/react/24/solid'
export default function SelectWalletHelper() {
  return (
    <div className="sm:hidden pt-2 grid grid-cols-8 gap-1">
      <div className='grid col-start-3 place-items-center col-span-3 animate-nw_diagonal'>
        <ArrowUpLeftIcon className="h-6 w-6"/>
      </div> 
      <div className='col-start-4 font-sans text-xs col-span-3'>
        Click Items Menu
      </div>
    </div>
  )
}
