import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";


function Dashboard() {

  const [itemsInUse, setItemsInUse] = useState([]);

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

    return (
      <div style={{ padding: 50 }}>
       <h1>Dashboard</h1>
       <Link href=""><button>Pending QC</button></Link>
       <Link href=""><button>Low Inventory</button></Link>
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
                    <td>QC Performed</td>
                  </tr>
                </thead>
                <tbody>
                    {itemsInUse.map((thisItem, index) =>{
                        return (
                            <tr key={thisItem.id}>

                                <td>{thisItem.reagent.name}</td>

                                <td>{thisItem.lot}</td>

                                <td>{thisItem.reagent.qualityControlInterval}</td>

                                <td>{thisItem.expirationDate}</td>

                                <td>{thisItem.receivedDate}</td>

                                <td>{thisItem.currentQuantity}</td>

                                <td>{thisItem.qualityControl.nextToken === null ? 
                                    "None"
                                    : thisItem.qualityControl.datePerformed }</td>
                                <td><button><Link href={`/qualityControl/${thisItem.id}`}>Add QC</Link></button></td>
                                <td><button><Link href={`/updateItem/${thisItem.id}`}>Update Item</Link></button></td>
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
  