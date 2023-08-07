import AddItemForm from "../components/addItemForm";
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction"
import React, {useState, useEffect} from 'react';


function AddItem() {

  const [listItems, setListItems] = useState();

  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => setListItems(data));
  }, [])

    return (
      <div style={{ padding: 50 }}>
        <Link href="/dashboard">Back to Dashboard</Link>
        <h1>Add Reagents
        </h1>
        <AddItemForm/>
        
      </div>
    )
  }
  
  export default AddItem;
  