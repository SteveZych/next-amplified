// import { withAuthenticator } from "@aws-amplify/ui-react";
import AddReagentForm from "../components/addReagentForm";
// Dashboard page
// Sidebar: different links for the app (reagents, quality control, expiring reagents, etc.)
// Main: Status tiles at the top of the page (needs qc, expiring reagents). Below tiles is a table 
// log of transactions of reagents
function Dashboard() {
    return (
      <div style={{ padding: 50 }}>
        <h1>is this the dashboard?
        </h1>
        <AddReagentForm/>
      </div>
    )
  }
  
  export default Dashboard;
  