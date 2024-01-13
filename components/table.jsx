

export default function Table({children}){
    return(
        <div className="tableWrapper">
            <table className='tables'>
                {children}
            </table>
        </div>

    )
}