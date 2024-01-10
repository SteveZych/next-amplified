import Link from 'next/link';
export default function InfoTile(props){
    return(
        <div className="infoTile">
            <Link href={props.href}>
                    {props.info} {props.additionalInfo}
            </Link>
        </div>
    )
}