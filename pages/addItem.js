import AddItemForm from "../components/addItemForm";
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";
import React, {useState, useEffect} from 'react';
import SideBar from "../components/sideBar";
import Header from "../components/header";
import Table from "../components/table";

function AddItem() {

  const [listItems, setListItems] = useState([]);

  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => {
      if (data === false || data.length === 0){
        setListItems(false)
      }else{
        setListItems(data);
      }
    })
  }, [])

  const recallLisOfItems = () => {
    listItemsFunction().then(data => setListItems(data))
  }

    return (
      <div className="sidebarAndPage">
        <SideBar/>

        <div className="page">
          <Header name={"Add Item"}/>
          <div >
          <AddItemForm recallLisOfItems={recallLisOfItems}/>

          {listItems ?  
            <Table>
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
                      <th>Update Item</th>
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
              </Table>
            :
            <h1>No items available.</h1>}
          </div>
        </div>
      </div>
    )
  }
  
  export default AddItem;
  