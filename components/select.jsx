import Select from '@mui/joy/Select';


export default function Selection({label,value, onChange, children, disabled, placeholder = "Select an option"}){
    return (
        <div>
            <p><label>{label}</label></p>
            <Select 
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </Select>
        </div>
    )
}