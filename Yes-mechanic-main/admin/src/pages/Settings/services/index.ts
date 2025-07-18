import Client from "../../../api"

export const getProfile=async () => {
    try {
        const response:any = await new Client().admin.profile.get('')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile=async (data:any) => {
    try {
        const response:any = await new Client().admin.profile.put(data)
        return response
    } catch (error) {
        console.log(error)
    }
}