/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../api";

export const postAnnouncement = async (data:any)=>{
     try{
        const response = await new Client().admin.Announcement.post(data)
        return response;
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}


export const getAnnouncement = async (data:any)=>{
     try{
        const response = await new Client().admin.Announcement.get(data)
        return response;
    }
    catch(error){
        console.log('Error fetching data:',error);
    }
}

export const updateAnnouncement = async (data:any , params : string) => {
    console.log('enter into service page')
    try {
        const response = await new Client().admin.Announcement.update(data , params);
        return response;
    } catch (error) {
        console.log('Error Updating data:',error);
    }
}

export const deleteAnnouncement = async (id: string) => {
    try {
        const response = await new Client().admin.Announcement.delete(id);
        return response;
    } catch (error) {
        console.log('Error deleting data:', error);
    }
}

