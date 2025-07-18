import Client from '../../../api';

export const getAllNotifications = async (data: any) => {
	try {
		const response = await new Client().user.notification.getAll(data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateNotificationById = async (params: any) => {
	try {
		const response = await new Client().user.notification.update(params);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};
