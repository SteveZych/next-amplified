

export default function Icon({number, statement}){
    console.log(number,statement)
    return(
        <div>
            <h1>{number}</h1>
            <h4>{statement}</h4>
        </div>
    )
}