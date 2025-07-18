import Client from "../../../api"

//getall spareparts category
export const getAllsparepartscategory=async()=>{
    try {
        const response = await new Client().admin.spareparts.category.getAll()
        if (response) return response
        
    } catch (error) {
        console.log(error)
        
    }

}

export const createsparepartscategory=async(data:string)=>{
    try {
        const response = await new Client().admin.spareparts.category.create(data)
        if (response) return response
        
    } catch (error) {
        console.log(error)
        
    }

}

export const updatesparepartscategory=async(params:string)=>{
    try {
        const response = await new Client().admin.spareparts.category.put(params)
        if (response) return response
        
    } catch (error) {
        console.log(error)
        
    }

}

export const deletesparepartscategory=async(params:string)=>{
    try {
        const response = await new Client().admin.spareparts.category.delete(params)
        if (response) return response
        
    } catch (error) {
        console.log(error)
        
    }

}