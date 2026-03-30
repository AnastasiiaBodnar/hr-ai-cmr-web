export default function Input ({ className = '', ...props }) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none ${className}`}
        />
    )
}