

export default function Icon({number, statement}){

    return(
        <div className="iconWrapper">
            <div className="icon">
                <p>{statement}</p>
                <p>{number}</p>
            </div>
        </div>
    )
}