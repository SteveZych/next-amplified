import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {listItemsFunction} from "../Functions/listItemsFunction";


function Dashboard() {

  const [itemsInUse, setItemsInUse] = useState([]);

  //Query for existing items and put them in a table on page load
  useEffect(() =>{
    listItemsFunction().then(data => {
      if (data == null){
        setItemsInUse([])
      }else{
        data.filter(item => item.currentValue > 0)
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
      </div>
    )
  }
  
  export default Dashboard;
  