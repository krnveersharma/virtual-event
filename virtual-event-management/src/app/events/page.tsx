'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '@/modules/Events/EventCard'

const Events = () => {
    const [eventData,setEventData]=useState([{
        title: "Loading..",
      venue: "Loading...",
      category: "Loading..",
      price: "$Loading..."
    }]);
    useEffect(()=>{
        const getData=async()=>{
        const res=await fetch('/data.json');
        const data=await res.json();
        setEventData(data);
        }
        getData();
    },[])
  return (
    <div className='flex flex-wrap gap-4'>
        {eventData?.map((items,index)=>(
            <div 
            key={index}
            className='transform transition-transform duration-300 hover:scale-105 cursor-pointer' // Tailwind classes for hover effect
          >
            <EventCard 
              title={items.title} 
              venue={items.venue} 
              category={items.category} 
              price={items.price} 
              imgsrc='/images/events/event.jpeg'
            />
          </div>
        ))}
        
    </div>
  )
}

export default Events