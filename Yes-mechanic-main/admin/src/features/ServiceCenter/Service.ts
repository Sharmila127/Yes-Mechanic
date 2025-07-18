/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../api"

export const getServiceCenter=async(data:any)=>{
    try{
        const response = await new Client().admin.servicecenter.getAll(data)
        return response
    } catch (error){
        console.log("Error in post servicecenter",error)
    }

}
export const getServices=async(data:any)=>{
    try{
        const response = await new Client().admin.servicecenter.getAllCat(data)
        return response
    } catch (error){
        console.log("Error in post services",error)
    }

}
export const getSpareparts=async(data:string)=>{
    try{
        const response = await new Client().admin.spareparts.getAll(data)
        return response
    } catch (error){
        console.log("Error in post spareparts",error)
    }
}

export const updateSpare = async(data:any,params:string)=>{
    try {
        console.log("call function")
        const response = await new Client().admin.spareparts.update(data,params)
        return response
    } catch (error) {
        console.log("error in update spare",error)
    }
}

