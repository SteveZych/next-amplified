import * as queries from '../src/graphqlcopy/queries';
import { API, graphqlOperation} from 'aws-amplify';


export async function individualIdFunction(ID){

    const IdParams = {
        id: ID
    }

    try{
        let data = await API.graphql(graphqlOperation(queries.getItem, IdParams));
        console.log(data)
    }catch (err){
        console.log(err)
    }
}