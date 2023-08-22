import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import Input from '/components/input';

const AddQualityControlForm = ({id}) =>{

     //State to keep track of the form
     const [qc, setQC] = useState({
        datePerformed: "",
        performedBy: "",
        comment: "",
    })

    //Handles form submit to create a new item
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newQC = {
            id: uniqueID,
            itemID: id,
            datePerformed: qc.datePerformed,
            performedBy: qc.performedBy,
            comment: qc.comment
        }
        
        const qcParams = {
            input: newQC
        };
       
        try{
            await API.graphql(graphqlOperation(mutations.createQualityControl, qcParams));
            
            setQC({
                datePerformed: "",
                performedBy: "",
                comment: "",
            });
           
            console.log('Successfully added new qc.')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
            <form className="" onSubmit={handleSubmit}>

                <Input 
                    htmlFor={"datePerformed"}
                    label={"Date Performed"}
                    name={"datePerformed"}
                    type={"date"}
                    value={qc.datePerformed}
                    placeHolder={"Date Performed"}
                    onChange={(e) => setQC({ ...qc, datePerformed: e.target.value })} 
                    />
                <Input 
                    htmlFor={"performedBy"}
                    label={"Performed By"}
                    name={"performedBy"}
                    type={"text"}
                    value={qc.performedBy}
                    placeHolder={"Performed By"}
                    onChange={(e) => setQC({ ...qc, performedBy: e.target.value })} 
                    />
                <Input 
                    htmlFor={"comment"}
                    label={"Comment"}
                    name={"comment"}
                    type={"text"}
                    value={qc.comment}
                    placeHolder={"Comments (QC lot, expiration date, etc."}
                    onChange={(e) => setQC({ ...qc, comment: e.target.value })} 
                    />
                
                <div className="submit-form">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddQualityControlForm;
    
