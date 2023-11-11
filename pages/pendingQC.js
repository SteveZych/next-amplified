import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import SideBar from "../components/sideBar";
import Header from "../components/header";
import {pendingQC} from '../Functions/getPendingQC'

export default function PendingQC(){

    const [needsQC, setNeedsQC] = useState([])

    useEffect(() =>{
        pendingQC().then(data => setNeedsQC(data))
    }, [])

    return(
        <div className="sidebarAndPage">
            <SideBar/>
            <div className="page">
            <Header name={"Pending QC"}/>
                <table>
                    <thead>
                        <tr>
                        <td>Reagent Name</td>
                        <td>Lot</td>
                        <td>QC Interval</td>
                        <td>Expiration Date</td>
                        <td>Received Date</td>
                        <td>Current Quantity</td>
                        <td>Initial Quantity</td>
                        <td>QC Performed</td>
                        </tr>
                    </thead>
                    <tbody>
                        {needsQC.map((thisItem, index) =>{
                            return (
                                <tr key={thisItem.id}>

                                    <td>{thisItem.reagent.name}</td>

                                    <td>{thisItem.lot}</td>

                                    <td>{thisItem.reagent.qualityControlInterval}</td>

                                    <td>{thisItem.expirationDate}</td>

                                    <td>{thisItem.receivedDate}</td>

                                    <td>{thisItem.currentQuantity}</td>

                                    <td>{thisItem.initialQuantity}</td>

                                    <td>{thisItem.qualityControl.items.length === 0 ? 
                                            "None"
                                            : thisItem.qualityControl.items[thisItem.qualityControl.items.length - 1].datePerformed }</td>
                                    <td><button><Link href={`/qualityControl/${thisItem.id}`}>Add QC</Link></button></td>
                                    <td><button><Link href={`/updateItem/${thisItem.id}`}>Update Item</Link></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}