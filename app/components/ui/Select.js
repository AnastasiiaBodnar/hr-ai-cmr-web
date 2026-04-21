'use client'

import { useState, useRef, useEffect } from 'react'

export default function Select({ options, value, onChange, name, placeholder = 'Select an option', className = '' }) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find(opt => opt.value === value)

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            <div
                className={`w-full px-4 h-[34px] border-[0.8px] rounded-lg text-[14px] font-normal font-roboto bg-[#F8FAFC] cursor-pointer flex items-center justify-between transition-colors ${isOpen ? 'border-accent ring-1 ring-accent/20' : 'border-[#B0B0B0] hover:border-gray-400'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[#898989]">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-teal-500' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <div
                                key={option.value}
                                className={`px-4 h-[28px] text-[14px] font-normal font-roboto cursor-pointer transition-colors flex items-center ${isSelected
                                        ? 'bg-[#0B8B952E] text-accent'
                                        : 'text-[#898989] hover:bg-gray-50'
                                    }`}
                                onClick={() => {
                                    onChange({ target: { name, value: option.value } })
                                    setIsOpen(false)
                                }}
                            >
                                <span>{option.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
