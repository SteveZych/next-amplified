export default function Select({label,value, onChange, children, disabled}){
    return (
        <div>
            <p><label>{label}</label></p>
            <select 
                value={value} 
                onChange={onChange}
                disabled={disabled}
            >
                {   children}
            </select>
        </div>
    )
}