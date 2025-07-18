import Client from '../../../api';

export const getDashboardData = async (data: any) => {
	try {
		const response = await new Client().admin.dashboard.get(data);
		return response;
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};
