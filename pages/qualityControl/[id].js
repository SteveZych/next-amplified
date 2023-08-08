import { useRouter } from 'next/router'

export default function AddQualityControl(){

    const router = useRouter()
    

    return(
        <div>
            <AddQualityControlForm id={router.query.id}/>
            
        </div>
    )
}