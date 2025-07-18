/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from "./httpClient";
import { API_END_POINTS } from "./httpEndpoints";


class Client{
admin={
    notification:{
    getById:(params:string)=>httpClient.get(API_END_POINTS.notification.GetById ,params),
    markAllAsread:(params:string,data:string)=>httpClient.update(API_END_POINTS.notification.markAllAsRead,params,data),
    delete:()=>httpClient.delete(API_END_POINTS.notification.delete),
    getAll:(data:string)=>httpClient.get(API_END_POINTS.notification.getall,data),
    getstats:(params:string)=>httpClient.get(API_END_POINTS.notification.Getstats,params),
    create:(data:string)=>httpClient.post(API_END_POINTS.notification.create,data),
    getByUser:(params:string)=>httpClient.get(API_END_POINTS.notification.getByUser,params) ,
    markAsRead:(params:string,data:string)=>httpClient.update(API_END_POINTS.notification.markAsRead,data,params),
    getUnreadCount:(params:string)=>httpClient.get(API_END_POINTS.notification.getUnreadCount,params),
    createBulk:(data:string)=>httpClient.post(API_END_POINTS.notification.createBulk,data),
    postpreferenceCreateOrUpdate:(data:string)=>httpClient.post(API_END_POINTS.notification.postperferenceCreateOrUpdate,data),
    putpereferenceCreateOrUpdate:(data:string,params:string)=>httpClient.update(API_END_POINTS.notification.putpreferenceCreateOrUpdate,params,data),
    getpreferenceGet:(data:string)=>httpClient.get(API_END_POINTS.notification.getPreferenceGet,data,),
    update:(data:string,params:string)=>httpClient.update(API_END_POINTS.notification.update,params,data),

},

   sos:{
    post:(data:any,)=>httpClient.post(API_END_POINTS.sos.Post,data),
    put:(data:any,params:string)=>httpClient.update(API_END_POINTS.sos.Put+params,data,''),
    get:(params:string)=>httpClient.get(API_END_POINTS.sos.Get.replace(':id',params),),
    getAll:()=>httpClient.get(API_END_POINTS.sos.GetAll,''),
    updatelist:(data:string,params:string)=>httpClient.update(API_END_POINTS.sos.put,data,params),
    getsosList:()=>httpClient.get(API_END_POINTS.sos.getsoslis),
    statuslist:(params:string,data:any)=>httpClient.update(API_END_POINTS.sos.updatelist.replace(':id',params),data),
    delete:(id:string)=>httpClient.delete(API_END_POINTS.sos.delete+id)
   },

   Announcement:{
    post:(data:any)=>httpClient.post(API_END_POINTS.announcement.Post,data),
    get:(data:any,)=>httpClient.get(API_END_POINTS.announcement.Get,data,),
    update: (data: any, params: string) =>
        httpClient.update(API_END_POINTS.announcement.update.replace(':uuid', params), data),
    delete: (id: string) => httpClient.delete(API_END_POINTS.announcement.delete.replace(':uuid', id)),
},

order_history: {
      getById: (params: string) =>
        httpClient.get(API_END_POINTS.order_history.getById, params),
      getAll: (params: string) =>
        httpClient.get(API_END_POINTS.order_history.getAll, params),
      getOldHistory: (params: string) =>
        httpClient.get(API_END_POINTS.order_history.getOldHistory, params),
      updateStatus: (data: any, params: string) =>
        httpClient.update(
          API_END_POINTS.order_history.updateStatus,
          data,
          params
        ),
      delete: () => httpClient.delete(API_END_POINTS.order_history.delete),
    },

    customer_management:{
      getallCustomer:(data:any)=>httpClient.get(API_END_POINTS.customer_management.getAll,data),
    },
    customermanagement_history:{
      getallHistory:(data:any)=>httpClient.get(API_END_POINTS.customermanagement_history.getAll,data)
    },


spareparts:{
    create:(data:any)=>httpClient.post(API_END_POINTS.spareparts.create,data),
    get:(params:string)=>httpClient.get(API_END_POINTS.spareparts.get,params),
    getAll:(params:string)=>httpClient.get(API_END_POINTS.spareparts.getall.replace(":uuid",params)),
    delete:(params:string)=>httpClient.delete(API_END_POINTS.spareparts.delete.replace(":id",params)),
    update:(data:string,params:string)=>httpClient.update(API_END_POINTS.spareparts.update.replace(":id",params),data),
   updatestatus:(data:string,params:string)=>httpClient.update(API_END_POINTS.spareparts.updatestatus,data,params),
   category:{
    create:(data?:any)=>httpClient.post(API_END_POINTS.spareparts.category.create,data),
    getAll:(params?:string)=>httpClient.get(API_END_POINTS.spareparts.category.getall),
    put:(params:any)=>httpClient.update(API_END_POINTS.spareparts.category.put.replace(":uuid",params?.uuid), params),
    delete:(params:any)=>httpClient.delete(API_END_POINTS.spareparts.category.delete.replace(":uuid",params?.uuid)),
   }
},
auth:{
  post:(data:any)=>httpClient.post(API_END_POINTS.auth.Post,data),
  postotp:(data:any)=>httpClient.post(API_END_POINTS.auth.Postotp,data,),
  postreset:(data:any)=>httpClient.post(API_END_POINTS.auth.Postreset,data,)  
},

profile:{
    get:(params:string)=>httpClient.get(API_END_POINTS.profile.Get,params),
    put:(data:string)=>httpClient.update(API_END_POINTS.profile.Put,data),
    post:(data:string)=>httpClient.post(API_END_POINTS.profile.Post,data,),
    postlogin:(data:any)=>httpClient.post(API_END_POINTS.profile.Postlogin,data)
},

		enquiry: {
			post: (data: string) =>
				httpClient.post(API_END_POINTS.enquiry.Post, data),
			get: (params: string) =>
				httpClient.get(API_END_POINTS.enquiry.Get, params),
			put: (data: string, params: string) =>
				httpClient.update(API_END_POINTS.enquiry.Put, data, params),
		},

		vechiclemanage: {
			get: (params: string) =>
				httpClient.get(API_END_POINTS.vechiclemanage.Get, params),
		},

  jobcard:{
    get:(params:string)=>httpClient.get(API_END_POINTS.jobcard.Get.replace(':id',params)),
    getAll:()=>httpClient.get(API_END_POINTS.jobcard.GetAll),
    post:(data:string)=>httpClient.post(API_END_POINTS.jobcard.Post,data),
    put:(data:any,params:string)=>httpClient.update(API_END_POINTS.jobcard.Put.replace(':id',params),data),
  },

 dashboard:{
    get:(params:string)=>httpClient.get(API_END_POINTS.dashboard.Get,params),
    getTransaction:(params:string)=>httpClient.get(API_END_POINTS.dashboard.GetTransaction,params),
    getCustomerDetails:(params:string)=>httpClient.get(API_END_POINTS.dashboard.GetCustomerDetails,params),
 },

 servicecenter:{
  getAll:(data:string)=>httpClient.get(API_END_POINTS.serviceCenter.getAll,data),
  getAllCat:(params:string)=>httpClient.get(API_END_POINTS.serviceCenter.getAllCat.replace(':uuid',params)),
  postPartner:(data:any)=>httpClient.post(API_END_POINTS.serviceCenter.postPartner,data),
  update:(data:any,params:string)=>httpClient.update(API_END_POINTS.serviceCenter.updatePatner.replace(':id',params),data,''),
  delete:(id:string)=>httpClient.delete(API_END_POINTS.serviceCenter.delete.replace(':id',id)),
  getCatEvery:()=>httpClient.get(API_END_POINTS.serviceCenter.getCatevery)
 },
 category:{
  create:(data:any)=>httpClient.post(API_END_POINTS.category.create,data),
  update:(data:any,params:string)=>httpClient.update(API_END_POINTS.category.update.replace(':uuid',params),data),
  delete:(params:string)=>httpClient.delete(API_END_POINTS.category.delete.replace(':uuid',params)),
 },

 service:{
  create:(data:any)=>httpClient.post(API_END_POINTS.service.create,data),
  update:(data:any,params:string)=>httpClient.update(API_END_POINTS.service.put.replace(':uuid',params),data),
  get:()=>httpClient.get(API_END_POINTS.service.getall),
  patch:(params:string)=>httpClient.patch(API_END_POINTS.service.patch.replace(':uuid',params)),
  delete:(params:string)=>httpClient.delete(API_END_POINTS.service.delete.replace(':id',params))
 },

 servicerequest:{
   getpending:()=>httpClient.get(API_END_POINTS.serviceRequest.getpending),
   getassigned:()=>httpClient.get(API_END_POINTS.serviceRequest.getassigned),
   update:(params:string,data:any)=>httpClient.update(API_END_POINTS.serviceRequest.updateservice.replace(':id',params),data),
   getbyid:(params:string)=>httpClient.get(API_END_POINTS.serviceRequest.getbyidservice.replace(':uuid',params))
 },

 subApis:{
  getpartnerList:()=>httpClient.get(API_END_POINTS.subApis.getpartnerList),
 },

 scheduleReq:{
  getAssignedAll:()=>httpClient.get(API_END_POINTS.scheduleReq.getAssignedAll),
  getUnassignedAll:()=>httpClient.get(API_END_POINTS.scheduleReq.getUnassignedAll),
  updateReq:(data:any,params:string)=>httpClient.update(API_END_POINTS.scheduleReq.updateReq.replace(':id',params),data)
 },


}


}



export default Client;
