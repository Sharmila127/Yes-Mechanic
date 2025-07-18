import Client from "../../../api"

export const getProfile = async(data: any) =>{
    try {
        const response = await new Client().admin.profile.get(data);
        console.log("Response", response)
        return response;
        
    } catch (error) {
        console.log('Error fetching data:',error);
    }
}