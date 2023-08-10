import { useRouter } from 'next/router';
import UpdateItemForm from '../../components/updateItemForm';

export default function AddItemUpdate(){

    const router = useRouter()
    
    

    return(
        <div>
            <UpdateItemForm id={router.query.id}/>
            
        </div>
    )
}