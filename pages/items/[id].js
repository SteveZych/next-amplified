import {useEffect, useState} from 'react';
import {graphqlQuery} from '../../Functions/getGraphqlQuery';
import Icon from '../../components/icon'
import { Amplify, withSSRContext } from "aws-amplify";
import * as queries from '../../src/graphqlcopy/queries';
import awsExports from "../../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });


export async function getServerSideProps({ req, params }) {
  const IdParams = {
    id: params.id
}
  const data = await graphqlQuery(req, queries.getItem, IdParams);

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
            lastQc.setMonth(lastQc.getMonth() + 1)
            
            return lastQc.toISOString().split('T', 1)[0]
        }
    }

    return(
        <div>
        
            <Icon number={item.currentQuantity} statement={"Current Quantity"}/> 
            <Icon number={item.reagent.upperLimitQuantity} statement={"Target Quantity"}/>
            <Icon number={getNextQcDate()} statement={"Next QC"}/>

            {item.updates.items.length === 0 ? "No updates to this item.":
            <table>
                <thead>

                </thead>
            </table>
            }

            {item.qualityControl.items.length === 0 ? "No quality control.": 
            <table>
                <thead>
                    <tr>
                        <td>Date Performed</td>
                        <td>Performed By</td>
                        <td>Comment</td>
                    </tr>
                </thead>
                <tbody>
                    {item.qualityControl.items.map(qc =>{
                        return(
                            <tr key={qc.id}>
                                <td>{qc.datePerformed}</td>
                                <td>{qc.performedBy}</td>
                                <td>{qc.comment}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            }

        </div>
    )
}