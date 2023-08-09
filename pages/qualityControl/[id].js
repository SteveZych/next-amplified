import { useRouter } from 'next/router';
import AddQualityControlForm from '../../components/addQualityControlForm';

export default function AddQualityControl(){

    const router = useRouter()
    
    

    return(
        <div>
            <AddQualityControlForm id={router.query.id}/>
            
        </div>
    )
}