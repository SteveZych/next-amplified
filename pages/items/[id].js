import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {individualIdFunction} from '../../Functions/getIndividualItem';
import Icon from '../../components/icon'

//this page is for individual item
// Icon for current quantity
// icon for target quantity
// icon for when next QC is due?
//table for updates
// table for quality control 

import { Amplify, withSSRContext } from "aws-amplify";
import * as queries from '../../src/graphqlcopy/queries';
import { API, graphqlOperation} from 'aws-amplify';
import awsExports from "../../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req, params }) {
  // Notice how the server uses `API` from `withSSRContext`, instead of the top-level `API`.
  const SSR = withSSRContext({ req })
  const ID = params.id  
  const IdParams = {
    id: ID
}
  const { data } = await SSR.API.graphql({query: queries.getItem, variables: IdParams});
  return {
    props: {
      data: data.getItem
    }
  }
}

export default function IndividualItem({data}){

    const [item, setItem] = useState(data)
    
    const getNextQcDate = () => {
        if (item.qualityControl.items.length === 0){
            let today = new Date()
            return today;
        }else{
            let qualityControl = item.qualityControl.items
            let lastQc = new Date(qualityControl[qualityControl.length - 1].datePerformed)
            lastQc.setMonth(lastQc.getMonth + 1)
            console.log(lastQc)
            
            // return lastQc.toISOString().split('T', 1)[0]
        }
    }

    return(
        <div>
        
            <Icon number={item.currentQuantity} statement={"Current Quantity"}/> 
            {/* <Icon number={item.reagent.upperLimitQuantity} statement={"Target Quantity"}/> */}
            <Icon number={getNextQcDate()} statement={"Next QC"}/>

        </div>
    )
}