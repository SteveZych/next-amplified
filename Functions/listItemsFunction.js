import * as queries from '../src/graphqlcopy/queries';
import { API, graphqlOperation} from 'aws-amplify';


export async function listItemsFunction(){
    try{
        let data = await API.graphql(graphqlOperation(queries.listItems));
        let existingItems = data.data.listItems.items;
        console.log(existingItems)
        return existingItems;
    }catch (err){
        console.log(err)
        return false;
    }
}