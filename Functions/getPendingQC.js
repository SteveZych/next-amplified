import {listItemsFunction} from "/Functions/listItemsFunction"

function checkPreviousQC(lastQcDate, secondToLastQcDate){
    const dateObject = new Date(lastQcDate);
    if (dateObject.getMonth() === 8 || dateObject.getMonth() === 3 || dateObject.getMonth() === 5 || dateObject.getMonth() === 10){
        if (30 - dateObject.getDate() < 7){
            return true;
        }
    }else if (31 - dateObject.getDate() < 7){
        return true;
    }else{
        return false;
    }

}

export async function pendingQC(){
    const currentItems = listItemsFunction();

    const needQC = [];

    if (currentItems === false){
        return [];
    }else{
        for (let i = 0; i < currentItems.length; i++){
            let lastDateQcPerformed = currentItems[i].qualityControl.items[currentItems[i].qualityControl.items.length - 1].datePerformed;
            if (currentItems[i].qualityControl.items.length === 0 ){
                needQC.push(currentItems[i]);
            } else if (currentItems[i].qualityControl.items.length === 1 && checkPreviousQC(lastDateQcPerformed)){
                needQC.push(currentItems[i]);
            }
            if (currentItems[i].qualityControl.items.length > 1){
                let secondToLastDateQcPerformed = currentItems[i].qualityControl.items[currentItems[i].qualityControl.items.length - 2].datePerformed
                if (currentItems[i].currentQuantity > 0 && checkPreviousQC(lastDateQcPerformed, secondToLastDateQcPerformed)){
                    needQC.push(currentItems[i]);
                }
            }
            
        return needQC;
        }
    }
    
}