import React from 'react'

type props = {
  color: 'orange' | 'green' | 'pink',
  title: string
}
function Badge({ color, title }: props) {
  const typeColor = {
    orange: 'bg-custom-orange',
    green: 'bg-custom-green',
    pink: 'bg-custom-pink',
  }
  return (
    <span className={` ${typeColor[color]} text-xs rounded-full flex justify-center items-center px-2 py-1 font-semibold`}>
      { title }
    </span>
  )
}

export default Badge
