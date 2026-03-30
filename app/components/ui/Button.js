export default function Button({ children, text, variant = 'primary', className = '', ...props }) {
    const styles = {
        primary: 'py-3 bg-accent text-white rounded-lg font-medium transition-colors',
        outline: 'py-3 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2'
    };

    return (
        <button className={`w-full ${styles[variant]} ${className}`} {...props}>
            {children || text}
        </button>
    )
}