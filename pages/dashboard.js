import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import {pendingQC} from "../Functions/getPendingQC";
import {lowInventory} from "../Functions/getLowInventory";
import SideBar from "../components/sideBar";
import Header from "../components/header";
import InfoTile from "../components/infoTile";
import Button from "../components/button";
import Table from "../components/table";

function MainDashboard() {

  const [itemsInUse, setItemsInUse] = useState([]);
  const [QC, setQC] = useState([]);
  const [inventory, setInventory] = useState([]);


  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => {
      if (data === false || data.length === 0){
        setItemsInUse(false)
      }else{
        data.filter(item => item.currentQuantity > 0)
        setItemsInUse(data)
      }
    })
  }, [])

  useEffect(() =>{
    pendingQC().then(data => setQC(data))
    lowInventory().then(data => setInventory(data))
  }, [])

    return (
      <div className="sidebarAndPage">
        <SideBar/>

        <div className="page">
          <Header name={"Dashboard"}/>

          <div className="infoTiles">
            <InfoTile href={"/pendingQC"} info={"Pending QC"} additionalInfo={QC.length}/>
            <InfoTile href={""} info={"Low Inventory"} additionalInfo={inventory.length}/>
            <InfoTile href={"/reagentTemplate"} info={"Add Reagent Template"}/>
            <InfoTile href={"/addItem"} info={"Add Item"}/>
          </div>
          

          {itemsInUse ?  
              <Table>
                    <thead>
                      <tr>
                        <th>Reagent Name</th>
                        <th>Lot</th>
                        <th>QC Interval</th>
                        <th>Expiration Date</th>
                        <th>Received Date</th>
                        <th>Current Quantity</th>
                        <th>Last QC Performed</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                        {itemsInUse.map((thisItem, index) =>{
                            return (
                              
                                <tr key={thisItem.id} >

                                    <td>{thisItem.reagent.name}</td>

                                    <td>{thisItem.lot}</td>

                                    <td>{thisItem.reagent.qualityControlInterval}</td>

                                    <td>{thisItem.expirationDate}</td>

                                    <td>{thisItem.receivedDate}</td>

                                    <td>{thisItem.currentQuantity}</td>

                                    <td>{thisItem.qualityControl.items.length === 0 ? 
                                        "None"
                                        : thisItem.qualityControl.items[thisItem.qualityControl.items.length - 1].datePerformed }</td>
                                    
                                    <td><Button><Link href={`/items/${thisItem.id}`}>Update Item</Link></Button></td>
                                </tr>
                            
                            )
                        })}
                    </tbody>
                </Table>
              :
              <h1>No items available.</h1>}
        </div>
       
      </div>
    )
  }
  
  export default MainDashboard;
  