import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'
import toast from 'react-hot-toast'

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    const resetHandler = async () => {
        try {
            const res = await API.post(`/auth/reset-password/${token}`, { password })
            toast.success(res.data.message)
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Reset Failed..')
        }
    }
    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={resetHandler}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Reset Password
            </button>
        </div>
    )
}

export default ResetPassword