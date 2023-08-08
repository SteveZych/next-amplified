import { useRouter } from 'next/router'

export default function AddQualityControl(){

    const router = useRouter()
    

    return(
        <div>
            <h1>ITEM {router.query.id}</h1>
        </div>
    )
}