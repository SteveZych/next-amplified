import AddItemForm from "../components/addItemForm";
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import React, {useState, useEffect} from 'react';


function AddItem({existingItems}) {

  const [listItems, setListItems] = useState([]);

  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => {
      if (data === false){
        setListItems(false)
      }else{
        setListItems(data);
      }
    })
  }, [])

    return (
      <div style={{ padding: 50 }}>
        <Link href="/dashboard">Back to Dashboard</Link>
        <h1>Add Reagents</h1>
        <AddItemForm/>

        {listItems ?  
          <table>
                <thead>
                  <tr>
                    <td>Reagent Name</td>
                    <td>Lot</td>
                    <td>QC Interval</td>
                    <td>Expiration Date</td>
                    <td>Received Date</td>
                    <td>QC Performed</td>
                  </tr>
                </thead>
                <tbody>
                    {listItems.map((thisItem, index) =>{
                        return (
                            <tr key={thisItem.id}>

                                <td>{thisItem.reagent.name}</td>

                                <td>{thisItem.lot}</td>

                                <td>{thisItem.reagent.qualityControlInterval}</td>

                                <td>{thisItem.expirationDate}</td>

                                <td>{thisItem.receivedDate}</td>

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
  
  export default AddItem;
  