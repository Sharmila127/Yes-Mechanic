export const API_END_POINTS = {
	dashboard: {
		Get: 'api/admin/dashboard/',
		GetTransaction: '/api/admin/dashboard/transaction',
		GetCustomerDetails: '/api/admin/dashboard/customerDetails/',
	},


    jobcard:{
            Post:"/api/jobcardscreateCard",
            Get:"/api/jobcards/getOne/:id",
            GetAll:"/api/jobcards/getAll",
            Put:"/api/jobcards/updateCard/:id",
    } ,

    
   vechiclemanage:{
            Get:"/api/vehicle/getall/",
   }  ,

   
   announcement:{
    Post:"/api/announcement/create",
    Get:"/api/announcement/all",
    update:"/api/announcement/update/:uuid",
    delete:"/api/announcement/delete/:uuid",

   },
   enquiry:{
    Post:"/api/enquiry/create",
     Get:"/api/serviceEnquiry/getAllEnquiries",
    Put:"/api/enquiry/update/:uuid",
   },

   sos:{
    Post:"/api/sos/add",
    GetAll:"/api/sos/getall",
    Get:"/api/sos/get/:id",
    Put:"/api/sos/update/",
    put:"/api/sos/addlist",
    getsoslis:"/api/sos/soslist",
    updatelist:"/api/sos/updatelist/:id",
    delete:"/api/sos/delete/"
   },

	profile: {
		Get: '/api/admin/auth/me',
		Put: '/api/admin/auth/update',
		Post: '/api/admin/auth/register',
		Postlogin: '/api/admin/auth/login',
	},

	auth: {
		Post: '/api/admin/auth/forget-pass',
		Postotp: '/api/admin/auth/verfiy-otp',
		Postreset: '/api/admin/auth/reset-pass/:id',
	},

   notification:{
    create:"/api/notifications/",
    createBulk:"/api/notifications/bulk",
    getByUser:"/api/notifications/user/:userId",
    getUnreadCount:"/api/notifications/user/:userId/unread-count",
    markAsRead:"/api/notifications/read/:uuid",
    markAllAsRead:"/api/notifications/read-all/:userId",
    Getstats:"/api/notifications/stats/:userId",
    delete:"/api/notifications/:uuid",
    getall:"/api/notifications/",
    GetById:"/api/notifications/:uuid",
    update:"/api/notifications/:uuid",
    postperferenceCreateOrUpdate:"/api/notifications/preferences",
    putpreferenceCreateOrUpdate:"/api/notifications/preference",
    getPreferenceGet:"/api/preferences/:userId",
   },

   spareparts:{
    create:"/api/admin/spareparts/create",
    get:"/api/admin/spareparts/create",
    getall:"/api/admin/spareparts/getall/:uuid",
    update:"/api/admin/spareparts/update/:id",
    updatestatus:"/api/admin/spareparts/updatestatus/:id",
    delete:"/api/admin/spareparts/delete/:id",

    category:{
      create:"/api/products/category/",
      getall:  "/api/products/category/getall",
      put : "/api/products/category/update/:uuid",
      delete:  "/api/products/category/delete/:uuid",
    }
   },

   serviceCenter:{
     getAll: "/api/admin/servicecenter/getall",
     getCatevery: "/api/admin/category/getAll/",
     getAllCat: "/api/admin/category/getAll/:uuid",
     postPartner: "/api/partner/auth/register",
     updatePatner: "/api/partner/auth/update/:id",
     delete:"/api/admin/servicecenter/delete/:id",
    },
    category:{
        update:"/api/admin/category/update/:uuid",
        delete:"/api/admin/category/delete/:uuid",
        create:"/api/admin/category/create",
    },
    service:{
        create:"/api/admin/service/",
        getall:'/api/admin/service/',
        put:'/api/admin/service/:uuid',
        patch:'/api/admin/service/toggle-status/:uuid',
        delete:'/api/admin/service/remove/:id',
    },

    order_history: {
      getById: `/api/partner/order-history/get/:id`,
      getAll: `/api/partner/order-history/getall`,
      getOldHistory: `/api/partner/order-history/getall/history`,
      updateStatus: `/api/partner/order-history/updatestatus/:id`,
      delete: `/api/partner/order-history/delete/:id`,
    },

    customer_management: {
      getAll :`/api/partner/customermanage`,
    },
    customermanagement_history:{
      getAll: `/api/partner/CustomerManagement/service-history`
    },

    serviceRequest:{
      getpending:'/api/admin/service-request/pending-service',
      getassigned:'/api/admin/service-request/assigned-service',
      getbyidservice:'/api/admin/service-request/service-request/byid/:uuid',
      updateservice:'/api/admin/service-request/update-pending-service/:id',
    },
   
    subApis:{
      getpartnerList:'/api/admin/fetch/partner-list/all',
    },

    scheduleReq:{
      getAssignedAll:'/api/admin/schedulerequest/assigned',
      getUnassignedAll:'/api/admin/schedulerequest/unassigned',
      updateReq:'/api/admin/schedulerequest/assign/:id',
    },

}