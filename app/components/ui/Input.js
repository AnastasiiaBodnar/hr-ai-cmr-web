export default function Input({ className = '', error = false, ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 border rounded-lg text-base outline-none transition-colors
        ${error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-gray-400'
        } ${className}`}
    />
  )
}