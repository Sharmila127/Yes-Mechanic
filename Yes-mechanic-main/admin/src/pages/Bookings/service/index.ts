/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index'

export const GetPendingRequest = async()=>{
    try {
        const response:any = await new Client().admin.servicerequest.getpending()
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAssignedRequest = async()=>{
    try {
        const response:any = await new Client().admin.servicerequest.getassigned()
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updatePendingRequest = async(params:string,data:any)=>{
    try {
        const response = await new Client().admin.servicerequest.update(params,data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
