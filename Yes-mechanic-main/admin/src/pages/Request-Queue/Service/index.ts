/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index'

export const GetAssignedScheduleReq = async()=>{
    try {
        const response:any = await new Client().admin.scheduleReq.getAssignedAll()
        return response.data
    } catch (error) {
        console.log("schedule request error:",error)
    }
}

export const GetUnassignedScheduleReq = async()=>{
    try {
        const response:any = await new Client().admin.scheduleReq.getUnassignedAll()
        return response.data
    } catch (error) {
        console.log("schedule request error:",error)
    }
}

export const UpdateScheduleReq=async(data:any,params:string)=>{
    try {
        const response:any = await new Client().admin.scheduleReq.updateReq(data,params)
        return response.data
    } catch (error) {
        console.log("schedule request error:",error)
    }
}