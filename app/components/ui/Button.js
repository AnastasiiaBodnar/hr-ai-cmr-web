export default function Button ({text, onClick, variant = 'primary'}){
    const styles = {
        primary: 'w-full py-3 bg-accent text-white rounded-lg font-medium',
        outline: 'w-full py-3 text-accent border border-black rounded-lg font-medium'
    }
    return(
        <button onClick={onClick} className={styles[variant]}>
            {text}
        </button>
    )
}