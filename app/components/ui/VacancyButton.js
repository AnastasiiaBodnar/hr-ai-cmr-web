'use client'

import React from 'react';

export default function VacancyButton({ children, onClick, className = '', icon: Icon, ...props }) {
    return (
        <button
            onClick={onClick}
            className={`w-[166px] h-[39px] bg-primary hover:bg-primary/90 text-white px-4 rounded-[5px] text-[16px] font-normal flex items-center justify-center gap-2 transition-all whitespace-nowrap ${className}`}
            {...props}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
}
