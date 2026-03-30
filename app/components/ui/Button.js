export default function Button ({ text, variant = 'primary', className = '', ...props }) {
    const styles = {
        primary: 'py-3 bg-accent text-white rounded-lg font-medium',
        outline: 'py-3 text-accent border border-black rounded-lg font-medium'
    };

    return(
        <button className={`w-full ${styles[variant]} ${className}`} {...props}>
            {text}
        </button>
    )
}