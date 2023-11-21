import Input from '@mui/joy/Input';


export default function InPut({htmlFor, label, name, type, value, placeHolder, onChange, disabled}){
    return(
        <div>
            <p><label htmlFor={htmlFor}>{label}</label></p>
            <Input
                name={name}
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                required
                disabled={disabled}
            />
        </div>
    )
}