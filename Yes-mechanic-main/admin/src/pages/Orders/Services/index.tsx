import Client from "../../../api";

export const getOrdersHistory = async(params: string)=>{
    try{
        const response = await new Client().admin.order_history.getAll(params)
        console.log(response);
        return response
    }catch(error){
        console.log("Error getting orders history:", error)
    }
}
export const getAllOrdersHistory = async(params: string)=>{
    try{
        const response = await new Client().admin.order_history.getOldHistory(params)
        console.log(response);
        return response
    }catch(error){
        console.log("Error getting orders history:", error)
    }
}

