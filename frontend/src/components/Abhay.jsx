import React from 'react'
import { useState } from 'react'
import logo from '../assets/qrimg.jpg'

const Abhay = () => {

    const [show,setShow] = useState(false)
    const handleClick=()=>{
        setShow(true)

        setTimeout(() => {
            setShow(false)
        }, 5000);
    }
  return (
    <div>
        {
            show && (
                <img width={200} className='ml-30' src={logo} alt="" />
            )
        }
        <button onClick={handleClick} className=' w-70 bg-amber-500 p-4 m-20'>Place Order</button>
    </div>
  )
}

export default Abhay