"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function FilterDropdown({
                                           placeholder,
                                           options,
                                           value,
                                           onChange,
                                           multi = false,
                                       }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabels = multi
        ? options
            .filter((option) => value.includes(option.value))
            .map((option) => option.label)
        : options.find((option) => option.value === value)?.label;

    const displayText = multi
        ? selectedLabels.length
            ? selectedLabels.join(", ")
            : placeholder
        : selectedLabels || placeholder;

    const handleOptionClick = (optionValue) => {
        if (multi) {
            const nextValue = value.includes(optionValue)
                ? value.filter((item) => item !== optionValue)
                : [...value, optionValue];

            onChange(nextValue);
            return;
        }

        onChange(optionValue);
        setOpen(false);
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`flex h-[38px] min-w-[126px] items-center justify-between gap-2 rounded-[6px] border bg-white px-3 text-[14px] ${
                    open ? "border-[#13B5C8]" : "border-black/15"
                }`}
            >
        <span className={`truncate ${displayText === placeholder ? "text-black/45" : "text-[#13B5C8]"}`}>
          {displayText}
        </span>

                <Image
                    src="/icons/arrow.png"
                    alt="Open filter"
                    width={10}
                    height={10}
                    className={`transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open ? (
                <div className="absolute left-0 top-[44px] z-50 min-w-full rounded-[8px] border border-black/10 bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
                    {options.map((option) => {
                        const isSelected = multi
                            ? value.includes(option.value)
                            : value === option.value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleOptionClick(option.value)}
                                className={`flex w-full items-center px-4 py-2 text-left text-[14px] ${
                                    isSelected
                                        ? "bg-[#BFE3E8] text-[#13B5C8]"
                                        : "text-black/35 hover:bg-black/5"
                                }`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}