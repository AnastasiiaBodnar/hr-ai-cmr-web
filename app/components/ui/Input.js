export default function Input ({ className = '', ...props }) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none transition-colors focus:border-gray-400 ${className}`}
        />
    )
}