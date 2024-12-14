'use client'

import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

interface UpdateDataModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function UpdateDataModal({ isOpen, onClose }: UpdateDataModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Complete seus dados</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome e sobrenome completo
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CPF ou CNPJ
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                                placeholder="000.000.000-00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data de nascimento
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                                placeholder="dd/mm/aaaa"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                            placeholder="(99) 99999-9999"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CEP
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                                placeholder="00000-000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Endereço
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5FD4E3] focus:border-transparent"
                                placeholder="Rua, número"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#5FD4E3] text-white py-2 rounded-lg hover:bg-[#4BC0CF] transition-colors"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    )
}

