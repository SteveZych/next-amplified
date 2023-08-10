export default function Select({label,value, onChange, children}){
    return (
        <div>
            <p><label>{label}</label></p>
            <select value={value} onChange={onChange}>
                {children}
            </select>
        </div>
    )
}