'use client'

import { useState, useRef, useEffect } from 'react'

export default function Select({ options, value, onChange, name, placeholder = 'Select an option' }) {
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
        <div className="relative w-full" ref={containerRef}>
            <div
                className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white cursor-pointer flex items-center justify-between transition-colors ${isOpen ? 'border-teal-500 ring-1 ring-teal-500' : 'border-gray-300 hover:border-gray-400'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'text-black' : 'text-gray-400'}>
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
                                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${isSelected
                                        ? 'bg-teal-50 text-teal-700 font-semibold'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                                    }`}
                                onClick={() => {
                                    onChange({ target: { name, value: option.value } })
                                    setIsOpen(false)
                                }}
                            >
                                <span>{option.label}</span>
                                {isSelected && (
                                    <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
