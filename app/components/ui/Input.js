export default function Input({ className = '', error = false, ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#F8FAFC] px-4 py-3 border-[0.8px] rounded-lg text-base outline-none transition-colors
        ${error
          ? 'border-red-500 focus:border-red-500'
          : 'border-[#B0B0B0] focus:border-gray-400'
        } ${className}`}
    />
  )
}