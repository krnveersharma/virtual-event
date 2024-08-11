"use client"
import React from 'react'
import { Toaster } from "react-hot-toast";
interface ProviderProps {
    children: React.ReactNode;
  }
const Provider = ({ children }: ProviderProps) => {
  return (
   
    <>{children}
    <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default Provider