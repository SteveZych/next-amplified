import { API, graphqlOperation} from 'aws-amplify';

import * as queries from '../src/graphqlcopy/queries';


export async function reagentTemplateData(){
    
        try{
            let data = await API.graphql(graphqlOperation(queries.listReagents));
            let existingReagents = data.data.listReagents.items;
            existingReagents.map(obj =>{
                obj.isEditing = false;
            })
            console.log(existingReagents)
            return existingReagents;
            
        }catch (err){
            console.log(err)
            return false;
        }
    
    
}


// export default reagentTemplateData;