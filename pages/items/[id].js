import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {individualIdFunction} from '../../Functions/getIndividualItem';


//this page is for individual item
// Icon for current quantity
// icon for target quantity
// icon for when next QC is due?
//table for updates
// table for quality control 

export default function IndividualItem(){

    const router = useRouter()
    
    useEffect(() =>{
        individualIdFunction(router.query.id)
    }, [])
    return(
        <div>

        </div>
    )
}