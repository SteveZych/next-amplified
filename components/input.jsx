export default function Input({htmlFor, label, name, type, value, placeHolder, onChange, disabled}){
    return(
        <div className="formInputWrapper">
            {value ? <label className="formInputLabel" htmlFor={htmlFor}>{label}</label> : ''}
            <input
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