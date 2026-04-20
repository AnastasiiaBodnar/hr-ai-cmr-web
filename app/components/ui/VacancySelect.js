'use client'

import { useState, useRef, useEffect } from 'react'

export default function VacancySelect({ options, value, onChange, name, placeholder = 'Select an option' }) {
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
                className={`w-[181px] h-[28px] px-3 border-[#B0B0B0] border-[0.8px] rounded-[5px] text-[16px] bg-[#F8FAFC] cursor-pointer flex items-center justify-between transition-colors ${isOpen ? '' : 'hover:border-gray-400'
                    }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[#898989] font-regular">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-accent' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-100 rounded-[10px] shadow-xl py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <div
                                key={option.value}
                                className={`px-3 py-1.5 text-[12px] cursor-pointer transition-colors flex items-center justify-between ${isSelected
                                    ? 'bg-[#0B8B9538] text-accent font-normal'
                                    : 'text-[#898989] hover:bg-gray-50 hover:text-accent'
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
