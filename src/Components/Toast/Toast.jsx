import {useState , useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
export default function Toast({message , type = "info"}) {
    useEffect(() => {
        if(message)
            toast[type](message)
        
    }, [message , type])
    
  return (
    <ToastContainer
    position="top-center"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
  )
}
