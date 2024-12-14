'use client'

import { useState } from 'react'
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'

interface UpdatePasswordModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function UpdatePasswordModal({ isOpen, onClose }: UpdatePasswordModalProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Alterar Senha</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Senha atual
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2.5 text-gray-500"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nova senha
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2.5 text-gray-500"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar nova senha
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2.5 text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#5FD4E3] text-white py-2 rounded-lg hover:bg-[#4BC0CF] transition-colors"
                    >
                        Atualizar Senha
                    </button>
                </form>
            </div>
        </div>
    )
}

