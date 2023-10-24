import Link from 'next/link';
export default function InfoTile(props){
    return(
        <div className="">
            <Link href={props.href}>
                <button className="infoTile">
                    {props.info} {props.additionalInfo}
                </button>
            </Link>
        </div>
    )
}