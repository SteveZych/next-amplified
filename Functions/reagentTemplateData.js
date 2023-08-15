import { API, graphqlOperation} from 'aws-amplify';

import * as queries from '../src/graphql/queries';


export async function reagentTemplateData(){
    
        try{
            let data = await API.graphql(graphqlOperation(queries.listReagents));
            let existingReagents = data.data.listReagents.items;
            existingReagents.map(obj =>{
                obj.isEditing = false;
            })
            
            return existingReagents;
            
        }catch (err){
            console.log(err)
            return true;
        }
    
    
}


// export default reagentTemplateData;