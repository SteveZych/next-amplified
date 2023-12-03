import Link from 'next/link';
import Button from './button'
export default function InfoTile(props){
    return(
        <div className="">
            <Link href={props.href}>
                <Button className="infoTile">
                    {props.info} {props.additionalInfo}
                </Button>
            </Link>
        </div>
    )
}