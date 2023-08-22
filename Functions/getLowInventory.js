import { reagentTemplateData } from "./reagentTemplateData";

export async function lowInventory(){
    try{
        const reagents = await reagentTemplateData();

        const currentLowInventory = []

        for (let i = 0; i < reagents.length; i++){
            if (reagents[i].item.length === 0 ){
                currentLowInventory.push(reagents[i])
            }
            if (reagents[i].item.length > 0){
                let currentItemQuantity = 0;
                for (let j = 0; j < reagents.item.length; j++){
                    currentItemQuantity += reagents[i].item[j].currentQuantity
                }
                if (currentItemQuantity < reagent[i].upperLimitQuantity){
                    currentLowInventory.push(reagents[i])
                }
            }
        }

        return currentLowInventory;

    }catch(err){
        console.log(err);
    }
}