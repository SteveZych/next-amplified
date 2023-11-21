import Select from '@mui/joy/Select';


export default function Selection({label,value, onChange, children, disabled}){
    return (
        <div>
            <p><label>{label}</label></p>
            <Select 
                value={value} 
                placeholder={"Select an option"}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </Select>
        </div>
    )
}