import React, { useState } from 'react'
import API from '../services/api'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const submitHandler = async () => {
        try {
            const res = await API.post('/auth/forgot-password', { email })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in Sending Link")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded">
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