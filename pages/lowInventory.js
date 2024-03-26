import React, {useState, useEffect} from 'react';
import SideBar from "../components/sideBar";
import Header from "../components/header";
import {lowInventory} from '../Functions/getLowInventory'
import AddQualityControlForm from "../components/addQualityControlForm";
import UpdateItemForm from "../components/updateItemForm"

export default function LowInventory(){

    const [lowInv, setLowInv] = useState([])

    useEffect(() =>{
        lowInventory().then(data => setLowInv(data))
    }, [])

    return(
        <div className="sidebarAndPage">
            <SideBar/>
            <div className="page">
            <Header name={"Low Inventory"}/>
                <table>
                    <thead>
                        <tr>
                        <th>Reagent Name</th>
                        <th>Lot</th>
                        <th>QC Interval</th>
                        <th>Expiration Date</th>
                        <th>Received Date</th>
                        <th>Current Quantity</th>
                        <th>Lower Limit Quantity</th>
                        <th>QC Performed</th>
                        <th>Add QC</th>
                        <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowInv.map((thisItem, index) =>{
                            return (
                                <tr key={thisItem.id}>

                                    <td>{thisItem.reagent.name}</td>

                                    <td>{thisItem.lot}</td>

                                    <td>{thisItem.reagent.qualityControlInterval}</td>

                                    <td>{thisItem.expirationDate}</td>

                                    <td>{thisItem.receivedDate}</td>

                                    <td>{thisItem.currentQuantity}</td>

                                    <td>{thisItem.reagent.lowerLimitQuantity}</td>

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