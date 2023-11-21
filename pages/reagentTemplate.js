import AddReagentForm from "../components/addReagentForm";

import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from '../Functions/reagentTemplateData';
import Link from 'next/link';
import InPut from '../components/input';
import Selection from '../components/select';
import SideBar from "../components/sideBar";
import Option from '@mui/joy/Option';

// TODO: Figure out how to recall the new data when user submits form now 
// that the form is abstracted to a component File.

const AddReagent = () => {

    const [listReagents, setListReagents] = useState([]);

    const qualityControlIntervalOptions = ["None", "Once","Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

    //Query for existing reagents and put them in a table on page load
    useEffect(() =>{
        reagentTemplateData().then(data => {
            if (data === false || data.length === 0){
                setListReagents(false);
            }else{
                setListReagents(data);
            }
        })
    }, [])


    //Allows user to edit the reagent inputs
    const editReagent = (id) => {
        setListReagents(prevListReagents => {
            return prevListReagents.map(reagent => reagent.id === id ? {...reagent, isEditing: true} : reagent)
        })
    }

    //Allows user to save edited reagent input and pushes changes to server
    const saveReagent = async (index) => {
        const {id, name, qualityControlInterval} = listReagents[index]
        
        try{
            const updateCurrentReagent = await API.graphql({ 
                query: mutations.updateReagent, 
                variables: { input: {id, name, qualityControlInterval} }
              });
              console.log("Successfully updated reagent.")

              //Recall the newly submitted data from API
              reagentTemplateData().then(data => setListReagents(data));
      }catch (err){
          console.log(err);
      }
    }

    //Allows user to delete reagent 
    const deleteReagent = async (reagentID) => {

        try{
              const deleteCurrentReagent = await API.graphql({ 
                query: mutations.deleteReagent, 
                variables: { input: {id: reagentID} }
              });
              console.log("Successfully deleted reagent.")

              //Recall the newly submitted data from API
              reagentTemplateData().then(data => setListReagents(data));
        }catch (err){
            console.log(err);
        }
    }

    const recallReagentTemplateData = () =>{
        //Recall the newly submitted data from API
        reagentTemplateData().then(data => setListReagents(data));
    }

    return(
        <div className="sidebarAndPage">
            <SideBar/>

            <div className="page">
            <Link href="/dashboard">Back to Dashboard</Link>
            <h1>Reagent Templates</h1>
            <AddReagentForm recallReagentTemplateData={recallReagentTemplateData}/>

            {listReagents ? 
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Reagent Name</td>
                            <td>QC Interval</td>
                            <td>Upper Limit Quantity</td>
                            <td>Lower Limit Quantity</td>
                            <td>Edit Reagent</td>
                            <td>Delete Reagent</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listReagents.map((thisReagent, index) =>{
                            return (
                                <tr key={thisReagent.id}>

                                    <td>{thisReagent.id}</td>

                                    <td>
                                    <InPut 
                                        htmlFor={"reagentName"}
                                        label={""}
                                        name={"reagentName"}
                                        type={"text"}
                                        value={thisReagent.name}
                                        placeHolder={"Reagent Name"}
                                        onChange={(e) => setListReagents(prevListReagents => {
                                            return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, name: e.target.value} : reag)
                                        })}
                                        disabled={!thisReagent.isEditing ? true : false}
                                    />
                                    </td>
                                    
                                    <td>
                                    <Selection
                                        label={""}
                                        value={thisReagent.qualityControlInterval}
                                        placeholder={thisReagent.qualityControlInterval}
                                        onChange={(e, newValue) => setListReagents(prevListReagents => {
                                            return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, qualityControlInterval: newValue} : reag)
                                        })}
                                        disabled={!thisReagent.isEditing ? true : false}
                                    >
                                        {qualityControlIntervalOptions.map((option, index) =>{
                                            return <Option key={index} value={option}>{option}</Option>
                                        })}
                                    </Selection>
                                    </td>

                                    <td>
                                    <InPut 
                                        htmlFor={"upperLimitQuantity"}
                                        label={""}
                                        name={"upperLimitQuantity"}
                                        type={"text"}
                                        value={thisReagent.upperLimitQuantity}
                                        placeHolder={"Upper Quantity Limit"}
                                        onChange={(e) => setListReagents(prevListReagents => {
                                            return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, upperLimitQuantity: e.target.value} : reag)
                                        })}
                                        disabled={!thisReagent.isEditing ? true : false}
                                    />
                                    </td>

                                    <td>
                                    <InPut 
                                        htmlFor={"lowerLimitQuantity"}
                                        label={""}
                                        name={"lowerLimitQuantity"}
                                        type={"text"}
                                        value={thisReagent.lowerLimitQuantity}
                                        placeHolder={"Lower Quantity Limit"}
                                        onChange={(e) => setListReagents(prevListReagents => {
                                            return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, lowerLimitQuantity: e.target.value} : reag)
                                        })}
                                        disabled={!thisReagent.isEditing ? true : false}
                                    />
                                    </td>

                                    <td>{!thisReagent.isEditing ? <button onClick={()=> editReagent(thisReagent.id)}>Edit</button> : <button onClick={()=> saveReagent(index)}>Save</button>}</td>

                                    <td><button onClick={()=> deleteReagent(thisReagent.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            :
            <h1>No reagents available.</h1>}
            </div>
        </div>
    )

}

export default AddReagent;