export default function Input ({type = 'text', placeholder, value, onChange}){
    return (
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none"
        />
    )
}