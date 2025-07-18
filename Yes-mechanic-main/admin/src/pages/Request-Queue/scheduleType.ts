export interface ScheduleRequest{
    requestType: string;
    assigned_date:string;
    amount:number;
    _id:string;
    uuid:string;
    requestId:string;
    customerId:{
        contact_info:{
            state:string;
            city:string;
            address1:string;
            address2:string;
            phoneNumber:string;
        },
        vehicleInfo:{
            registerNumber:string;
            model:string;
        },
        firstName:string;
        lastName:string;
    },
    schedule_date:string;
    service:[{
        _id:string;
        service_name:string;
        uuid:string;
    }],
    createdAt:string;
}

export interface assignedScheduleRequest {
    assigned_date: string;
    amount: number;
    _id: string;
    uuid: string;
    requestId: string;
    customerId: {
        contact_info: {
            state: string;
            city: string;
            address1: string;
            address2: string;
            phoneNumber: string;
        },
        vehicleInfo: {
            registerNumber: string;
            model: string;
        },
        firstName: string;
        lastName: string;
    },
    schedule_date: string;
    service: [{
        _id: string;
        service_name: string;
        uuid: string;
    }],
    partnerId:{
        contact_info:{
            phoneNumber:string;
            state:string;
            city:string;
            address1:string;
            address2:string;
        },
        firstName:string;
        lastName:string;
    }
    createdAt: string;
}