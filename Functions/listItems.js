import * as queries from '../src/graphql/queries';
import { API, graphqlOperation} from 'aws-amplify';


export async function listItems(){
    try{
        let data = await API.graphql(graphqlOperation(queries.listItems));
        let existingItems = data.data.listItems.items;
        return existingItems;
        
    }catch (err){
        console.log(err)
    }
}