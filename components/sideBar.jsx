import Link from 'next/link';
import SidebarLink from './sidebarLink';

export default function SideBar(){
    return(
        <div className="sideBar">
            <Link className="sideBarTitle" href="/index">Lab Pro</Link>
            <SidebarLink linkTo={"/dashboard"} linkName={"Dashboard"}/>
            <SidebarLink linkTo={"/addItem"} linkName={"Add Item"}/>
            <SidebarLink linkTo={"/reagentTemplate"} linkName={"Reagent Template"}/>
            <SidebarLink linkTo={"/items/allitems"} linkName={"All Items"}/>
        </div>
    )
}