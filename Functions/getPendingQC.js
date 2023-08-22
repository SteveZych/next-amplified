import next from "next";
import {listItemsFunction} from "./listItemsFunction"

function checkPreviousQC(lastQc){
    const lastQcDate = new Date(lastQc);
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0)

    const sevenDaysFromNow = new Date(currentDate)
    sevenDaysFromNow.setDate(currentDate.getDate() + 7)

    const nextQcDate = new Date(lastQcDate)
    nextQcDate.setMonth(lastQcDate.getMonth() + 1)
    if (currentDate <= nextQcDate && nextQcDate <= sevenDaysFromNow ){
        return true;
    }else{
        return false;
    }
}

export async function pendingQC(){
    try{
        const currentItems = await listItemsFunction();

        const needQC = [];

        if (currentItems === false){
            return [];
        }else{
            for (let i = 0; i < currentItems.length; i++){
                if(currentItems[i].currentQuantity > 0){
                    
                    if (currentItems[i].qualityControl.items.length === 0 ){
                        needQC.push(currentItems[i]);
                    } 
                    if (currentItems[i].qualityControl.items.length > 0){
                        let lastDateQcPerformed = currentItems[i].qualityControl.items[currentItems[i].qualityControl.items.length - 1].datePerformed;
                        if(checkPreviousQC(lastDateQcPerformed)){
                            needQC.push(currentItems[i]);
                        }
                        
                    }
                }
            }
            return needQC;
        }
    }catch(err){
        console.log(err)
    }
    
}