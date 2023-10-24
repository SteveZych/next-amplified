import Link from 'next/link';
import SidebarLink from './sidebarLink';

export default function SideBar(){
    return(
        <div className="sideBar">
            <SidebarLink linkTo={"/index"} linkName={"Lab Pro"}/>
            <SidebarLink linkTo={"/dashboard"} linkName={"Dashboard"}/>
            <SidebarLink linkTo={"/addItem"} linkName={"Add Item"}/>
            <SidebarLink linkTo={"/addReagent"} linkName={"Add Reagent"}/>
            <SidebarLink linkTo={"/items/allitems"} linkName={"All Items"}/>
        </div>
    )
}