import React, { useState } from 'react'
import API from '../services/api'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);


    const submitHandler = async () => {
        setLoading(true)
        try {
            const res = await API.post('/auth/forgot-password', { email })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in Sending Link")
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded">

            {/* 🔹 Overlay Loader with GIF */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center flex-col bg-opacity-70 z-50">
                    <img
                        src="https://vmsmobile.azurewebsites.net/images/Spinner-3.gif"
                        alt="Loading..."
                        className="w-16 h-16"
                    />
                    <p className=' text-center text-green-500 mt-2 text-xl font-bold bg-white p-3 rounded-md text-shadow-amber-300'>Logging...</p>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={submitHandler}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Send Reset Link
            </button>
        </div>

    )
}

export default ForgotPassword