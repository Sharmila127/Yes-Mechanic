import Client from "../../api";


export const getvechiclemanage =async (params:any)=>{
    try{ 
        const response =  await new Client().admin.vechiclemanage.get(params)
        // console.log('vehicle dt',response)
        return response
    }
    catch(error)
    {
        console.log('Error fetching data:',error);
        
    }
}
