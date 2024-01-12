import Link from 'next/link';
export default function SidebarLink(props){
    return(
        <div className="sideBarLinkWrapper">
            <Link className="sideBarLink" href={props.linkTo}>{props.linkName}</Link>
        </div>
    )
}