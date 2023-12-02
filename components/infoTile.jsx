import Link from 'next/link';
import Button from '@mui/joy/Button';

export default function InfoTile(props){
    return(
        <div className="">
            <Link href={props.href}>
                <Button color="neutral" variant="soft" className="infoTile">
                    {props.info} {props.additionalInfo}
                </Button>
            </Link>
        </div>
    )
}