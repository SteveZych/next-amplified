import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import SideBar from "../components/sideBar";
import Header from "../components/header";
import {pendingQC} from '../Functions/getPendingQC'
import AddQualityControlForm from "../components/addQualityControlForm";
import UpdateItemForm from "../components/updateItemForm"

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
                        <th>Reagent Name</th>
                        <th>Lot</th>
                        <th>QC Interval</th>
                        <th>Expiration Date</th>
                        <th>Received Date</th>
                        <th>Current Quantity</th>
                        <th>Initial Quantity</th>
                        <th>QC Performed</th>
                        <th>Add QC</th>
                        <th>Add/Remove</th>
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
                                    <td><AddQualityControlForm id={thisItem.id} reagentName={thisItem.reagent.name} reagentLot={thisItem.lot}/></td>
                                    <td><UpdateItemForm id={thisItem.id} reagentName={thisItem.reagent.name} reagentLot={thisItem.lot}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}