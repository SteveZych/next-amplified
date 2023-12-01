import { withSSRContext} from 'aws-amplify';

export async function graphqlQuery(req, query, variable){

    try{
        const SSR = withSSRContext({ req })

        const { data } = await SSR.API.graphql({query: query, variables: variable});
    
        return data;
    }catch (err){
        console.log(err)
    }
}