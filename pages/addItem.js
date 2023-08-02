import AddItemForm from "../components/addItemForm";
import Link from 'next/link';

function AddItem() {
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
  