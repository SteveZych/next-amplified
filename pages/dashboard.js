import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import {pendingQC} from "../Functions/getPendingQC";
import {lowInventory} from "../Functions/getLowInventory";



function Dashboard() {

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
      <div style={{ padding: 50 }}>
       <h1>Dashboard</h1>
       <Link href=""><button>Pending QC {QC.length}</button></Link>
       <Link href=""><button>Low Inventory {inventory.length} </button></Link>
       <Link href="/addReagent"><button>Add Reagent</button></Link>
       <Link href="/addItem"><button>Add Item</button></Link>

       {itemsInUse ?  
          <table>
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
    )
  }
  
  export default Dashboard;
  