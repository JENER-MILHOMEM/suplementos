'use client'

import { useState, useRef, useEffect } from 'react'
import { FaUser, FaUserEdit, FaKey, FaSignOutAlt } from 'react-icons/fa'
import  UpdateDataModal  from '../modals/UpdateDataModal'
import  UpdatePasswordModal  from '../modals/UpdatePasswordModal'

export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [showUpdateData, setShowUpdateData] = useState(false)
    const [showUpdatePassword, setShowUpdatePassword] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-gray-700 hover:text-[#5FD4E3] focus:outline-none"
                >
                    <FaUser className="mr-1" />
                    <span>Perfil</span>
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <button
                            onClick={() => {
                                setShowUpdateData(true)
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <FaUserEdit className="mr-2" />
                            Alterar Dados
                        </button>
                        <button
                            onClick={() => {
                                setShowUpdatePassword(true)
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <FaKey className="mr-2" />
                            Alterar Senha
                        </button>
                        <button
                            onClick={() => {
                                // Handle logout
                                setIsOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <FaSignOutAlt className="mr-2" />
                            Sair
                        </button>
                    </div>
                )}
            </div>

            <UpdateDataModal
                isOpen={showUpdateData}
                onClose={() => setShowUpdateData(false)}
            />

            <UpdatePasswordModal
                isOpen={showUpdatePassword}
                onClose={() => setShowUpdatePassword(false)}
            />
        </>
    )
}

