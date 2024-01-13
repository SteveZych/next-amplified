//comment

export default function Button({children, click}){
    return(
        <div>
            <button className="btn" onClick={click}>
                {children}
            </button>
        </div>
    )
}