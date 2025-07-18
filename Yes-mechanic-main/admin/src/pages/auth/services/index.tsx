import Client from '../../../api';

export const postLogin = async (data: any) => {
	try {
		const response = await new Client().admin.profile.postlogin(data);
		console.log(response, 'client response');
		return response;
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};

// export const register = async (data:any)=>{
//     try{
//         const response = await new Client().admin.profile.post(data)
//         return response;
//     }
//     catch(error){
//    console.log('Error fetching data:',error);
//     }
// }

export const update = async( data:string)=>{
    try{
        const response= await new Client().admin.profile.put(data)
        return response;
    }
    catch (error){
        console.log('Error fetching data:',error);
    }
}

