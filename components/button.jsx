//comment

export default function Button({children, click, className}){
    return(
        <div>
            <button className={className} onClick={click}>
                {children}
            </button>
        </div>
    )
}