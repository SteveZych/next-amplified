import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import {pendingQC} from "../Functions/getPendingQC";
import {lowInventory} from "../Functions/getLowInventory";
import SideBar from "../components/sideBar";
import Header from "../components/header";
import InfoTile from "../components/infoTile";

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
            <InfoTile href={"/addReagent"} info={"Add Reagent"}/>
            <InfoTile href={"/addItem"} info={"Add Item"}/>
          </div>
          

          {itemsInUse ?  
              <table className="pageTable">
                    <thead>
                      <tr>
                        <td>Reagent Name</td>
                        <td>Lot</td>
                        <td>QC Interval</td>
                        <td>Expiration Date</td>
                        <td>Received Date</td>
                        <td>Current Quantity</td>
                        <td>Last QC Performed</td>
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
                                    
                                    <td><button><Link href={`/items/${thisItem.id}`}>Update Item</Link></button></td>
                                </tr>
                            
                            )
                        })}
                    </tbody>
                </table>
              :
              <h1>No items available.</h1>}
        </div>
       
      </div>
    )
  }
  
  export default MainDashboard;
  