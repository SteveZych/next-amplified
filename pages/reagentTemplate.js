import AddReagentForm from "../components/addReagentForm";

import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from '../Functions/reagentTemplateData';
import Link from 'next/link';
import Input from '../components/input';
import Select from '../components/select';
import SideBar from "../components/sideBar";
import Button from "../components/button";
import Table from "../components/table";

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
                <div className="pageHead">
                    <h1>Reagent Templates</h1>
                    <AddReagentForm recallReagentTemplateData={recallReagentTemplateData}/>
                </div>
                {listReagents ? 
                    <Table>
                        <thead>
                            <tr>
                                <th>Reagent Name</th>
                                <th>QC Interval</th>
                                <th>Upper Limit Quantity</th>
                                <th>Lower Limit Quantity</th>
                                <th>Edit Reagent</th>
                                <th>Delete Reagent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listReagents.map((thisReagent, index) =>{
                                return (
                                    <tr key={thisReagent.id}>

                                        <td>
                                        <Input 
                                            htmlFor={"reagentName"}
                                            label={""}
                                            name={"reagentName"}
                                            type={"text"}
                                            value={thisReagent.name}
                                            placeHolder={"Reagent Name"}
                                            onChange={(e) => setListReagents(prevListReagents => {
                                                return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, name: e.target.value} : reag)
                                            })}
                                            disabled={!thisReagent.isEditing ? "disabled" : ''}
                                        />
                                        </td>
                                        
                                        <td>
                                        <Select
                                            label={""}
                                            value={thisReagent.qualityControlInterval}
                                            onChange={(e) => setListReagents(prevListReagents => {
                                                return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, qualityControlInterval: e.target.value} : reag)
                                            })}
                                            disabled={!thisReagent.isEditing ? "disabled" : ''}
                                        >
                                            {qualityControlIntervalOptions.map((option, index) =>{
                                                return <option key={index}>{option}</option>
                                            })}
                                        </Select>
                                        </td>

                                        <td>
                                        <Input 
                                            htmlFor={"upperLimitQuantity"}
                                            label={""}
                                            name={"upperLimitQuantity"}
                                            type={"text"}
                                            value={thisReagent.upperLimitQuantity}
                                            placeHolder={"Upper Quantity Limit"}
                                            onChange={(e) => setListReagents(prevListReagents => {
                                                return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, upperLimitQuantity: e.target.value} : reag)
                                            })}
                                            disabled={!thisReagent.isEditing ? "disabled" : ''}
                                        />
                                        </td>

                                        <td>
                                        <Input 
                                            htmlFor={"lowerLimitQuantity"}
                                            label={""}
                                            name={"lowerLimitQuantity"}
                                            type={"text"}
                                            value={thisReagent.lowerLimitQuantity}
                                            placeHolder={"Lower Quantity Limit"}
                                            onChange={(e) => setListReagents(prevListReagents => {
                                                return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, lowerLimitQuantity: e.target.value} : reag)
                                            })}
                                            disabled={!thisReagent.isEditing ? "disabled" : ''}
                                        />
                                        </td>

                                        <td>{!thisReagent.isEditing ? <Button click={()=> editReagent(thisReagent.id)}>Edit</Button> : <Button click={()=> saveReagent(index)}>Save</Button>}</td>

                                        <td><Button click={()=> deleteReagent(thisReagent.id)}>Delete</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    
                :
                <h1>No reagents available.</h1>}
             
            </div>
        </div>
    )

}

export default AddReagent;