import * as queries from '../src/graphqlcopy/queries';
import { API, graphqlOperation} from 'aws-amplify';




export async function individualIdFunction(ID){

    const IdParams = {
        id: ID
    }

    try{
        let data = await API.graphql(graphqlOperation(queries.getItem, IdParams));
        const item = data.data.getItem;
        console.log(item)
        return item;
    }catch (err){
        console.log(err)
    }
}