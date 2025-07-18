import Client from "../../../api"


export const getBookingAll = async (data: any) => {
    try{
        const response = await new Client().user.bookings.getAll(data)
        return response;
    }
    catch (error){
        console.log(error);
    }
}

export const postBookingProduct = async (data: any) => {
    try{
        const response = await new Client().user.bookings.postProduct(data)
        return response
    }
    catch(error){
        console.log(error)
    }
}

export const postBookingService = async (data: any) => {
    try{
        const response = await new Client().user.bookings.postService(data)
        return response
    }
    catch(error){
        console.log(error)
    }
}