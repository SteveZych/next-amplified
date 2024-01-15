export default function Textarea({htmlFor, label, name, type, value, placeHolder, onChange, disabled}){
    return(
        <div className="formTextareaWrapper">
            {value ? <label className="formTextareaLabel" htmlFor={htmlFor}>{label}</label> : ''}
            <textarea
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