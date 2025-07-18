/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../api/index'

export const GetPartnerList=async()=>{
    try {
        const response:any = await new Client().admin.subApis.getpartnerList()
        return response.data
    } catch (error) {
        console.log(error)
    }
}