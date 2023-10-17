import Link from 'next/link';


export default function SideBar(){
    return(
        <div className="sideBar">
            <Link href="/index">Lab Pro</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/addItem">Add Item</Link>
            <Link href="/addReagent">Add Reagent</Link>
            <Link href="/items/allitems">All Items</Link>
            <Link href=""></Link>
            <Link href=""></Link>
        </div>
    )
}