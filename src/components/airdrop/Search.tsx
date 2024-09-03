import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import Input from '../common/Input'

type Props = {
  searchValue: string
  setSearchValue: Function
}

function Search({ searchValue, setSearchValue}: Props) {
  return (
    <div className="border border-white rounded-full flex px-3 gap-2 items-center">
      <SearchIcon className="h-10" />
      <Input
        name='search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className='text-xl outline-none'
        border={false}
        placeholder='Search Airdrop'
      />
    </div>
  )
}

export default Search
