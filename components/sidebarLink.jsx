import Link from 'next/link';
export default function SidebarLink(props){
    return(
        <div className="sidebarLink">
            <Link href={props.linkTo}>{props.linkName}</Link>
        </div>
    )
}