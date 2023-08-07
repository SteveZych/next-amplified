import AddItemForm from "../components/addItemForm";
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import React, {useState, useEffect} from 'react';


function AddItem({existingItems}) {

  const [listItems, setListItems] = useState([]);

  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => setListItems(data));
  }, [])

    return (
      <div style={{ padding: 50 }}>
        <Link href="/dashboard">Back to Dashboard</Link>
        <h1>Add Reagents</h1>
        <AddItemForm/>

        <table>
                <thead>
                  <tr>
                    <td>Reagent Name</td>
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

                                <td>{thisItem.reagent.qualityControlInterval}</td>

                                <td>{thisItem.expirationDate}</td>

                                <td>{thisItem.receivedDate}</td>

                                <td>{thisItem.qualityControl.nextToken === null ? 
                                   <button>Add QC</button>
                                    : thisItem.qualityControl.datePerformed }</td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        
      </div>
    )
  }
  
  export default AddItem;
  