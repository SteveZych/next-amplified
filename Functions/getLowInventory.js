import { listItemsFunction } from "./listItemsFunction";

export async function lowInventory(){
    try{
        const currentItems = await listItemsFunction();

        const lowInventoryItems = [];

        if (currentItems === false){
            return [];
        }else{
            for (let i = 0; i < currentItems.length; i++){
                if(currentItems[i].currentQuantity > 0){
                    if (currentItems[i].currentQuantity < currentItems[i].reagent.lowerLimitQuantity){
                        lowInventoryItems.push(currentItems[i]);
                    }
                }else{
                    continue;
                }
            }
            return lowInventoryItems;
        }
    }catch(err){
        console.log(err)
    }
    

}
