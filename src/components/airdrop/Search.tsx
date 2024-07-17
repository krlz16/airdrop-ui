import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import Input from '../common/Input'

function Search() {
  return (
    <div className="border border-white rounded-full flex px-3 gap-2 items-center">
      <SearchIcon className="h-10" />
      <Input
        className='text-xl'
        border={false}
        placeholder='Search runes'
      />
    </div>
  )
}

export default Search
