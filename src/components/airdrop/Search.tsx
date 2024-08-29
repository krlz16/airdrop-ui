import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import Input from '../common/Input'

function Search() {
  return (
    <div className="border border-white rounded-full flex px-3 gap-2 items-center">
      <SearchIcon className="h-10" />
      <Input
        name='search'
        value={''}
        onChange={() => null}
        className='text-xl outline-none'
        border={false}
        placeholder='Search airdrop'
      />
    </div>
  )
}

export default Search
