
import Client from "../../../../api"

export const getAllNotification =async (data:any)=>{
    try{
        const response = await new Client().admin.notification.getAll(data)
       return response;
       // console.log(response);
    }
    catch(error) {
        console.log('Error fetching data:',error);
    }
}

export const DeleteNotification = async ()=>{
    try{
        const response = await new Client().admin.notification.delete()
      return response;
      //  console.log(response);
    }
    catch(error){
        console.log('Error fetching data:',error)
    }

}  

export const  updateNotification = async (data:string,params:string)=>{
    try{
        const response = await new Client().admin.notification.update(data,params)
       return response;
        // console.log(response);
    }
    catch(error){
      console.log('Error fetching data:',error)
    }
}

export const markAsReadNotification= async(data:string,params:string)=>{
    try{
    const response = await new Client().admin.notification.markAsRead(data,params)
   // console.log(response);
 return response;   
}
    catch (error){
        console.log('Error fetching data:',error);

    }
}

export const markAllAsReadNotification = async (data:string,params:string)=>{
    try{
   const response = await new Client().admin.notification.markAllAsread(data,params)
  // console.log(response);

  return response;
    }
    catch (error) {
  console.log('Error fetching data:',error);
    }
}


export const GetstatsNotification  = async (params:string)=>{
    try{
        const response = await new Client().admin.notification.getstats(params)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const createNotification = async (data:string)=>{
    try{
 const response = await new Client().admin.notification.create(data)
 return response;
    }
    catch (error){
 console.log('Error fetching data:',error);
    }
}

export const createBulkNotification = async (data:string)=>{
    try{
        const response= await new Client().admin.notification.createBulk(data)
    return response;
    }

    catch (error){
        console.log('Error fetching data:',error);
    }
}


export const  getByIdNotification = async (params:string)=>{
    try{
        const response= await new Client().admin.notification.getById(params)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const  getByUserNotification = async (params:string)=>{
    try{
        const response= await new Client().admin.notification.getByUser(params)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const  getUnreadCountNotification = async (params:string)=>{
    try{
        const response= await new Client().admin.notification.getUnreadCount(params)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const  getPreferenceNotification = async (params:string)=>{
    try{
        const response= await new Client().admin.notification.getpreferenceGet(params)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const  postpreferenceCreateNotification = async (data:string)=>{
    try{
        const response= await new Client().admin.notification.postpreferenceCreateOrUpdate(data)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

export const  putperferenceNotification = async (params:string,data:string)=>{
    try{
        const response= await new Client().admin.notification.putpereferenceCreateOrUpdate(params,data)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}