export default function Input({htmlFor, label, name, type, value, placeHolder, onChange}){
    return(
        <div>
            <p><label htmlFor={htmlFor}>{label}</label></p>
            <input
                name={name}
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                required
            />
        </div>
    )
}