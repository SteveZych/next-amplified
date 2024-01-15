export default function Select({label,value, onChange, children, disabled}){
    return (
        <div className="formSelectWrapper">
            <select 
                className="formSelect"
                value={value} 
                onChange={onChange}
                disabled={disabled}
            >
                {   children}
            </select>
        </div>
    )
}