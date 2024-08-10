import Image from 'next/image'
import React from 'react'

const EventCard = ({imgsrc,title,venue,category,price}:{
    imgsrc:string,
    title:string,
    venue:string,
    category:string,
    price:string
}) => {
  return (
    <div className='relative h-[400px] w-[200px]'> 
      <div className='relative h-[250px] w-full border-2 border-black rounded-md'>
        <Image src={imgsrc} alt="Not present" layout='fill' objectFit='cover'/>
      </div>
      <div className='font-bold'>{title}</div>
      <div id='venue' className='text-gray-400 text-sm'>{venue}</div>
      <div id='category' className='text-gray-400 text-sm'>{category}</div>
      <div id='price' className='text-gray-400 text-sm'>{price}</div>
    </div>
  )
}

export default EventCard
