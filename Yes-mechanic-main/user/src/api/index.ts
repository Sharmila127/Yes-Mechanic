import httpClient from './httpClient';
import { API_END_POINTS } from './httpEndpoints';

class Client {
	user = {
		services: {
			service_category: {
				getById: (params?: string) =>
					httpClient.get(
						API_END_POINTS.services.service_category.getById,
						params
					),
				getAll: (params?: string) =>
					httpClient.get(
						API_END_POINTS.services.service_category.getAll,
						params
					),
				post: (params: string) =>
					httpClient.post(
						API_END_POINTS.services.service_category.post,
						params
					),
				put: (params: string, data: string) =>
					httpClient.update(
						API_END_POINTS.services.service_category.put,
						params,
						data
					),
				delete: (params: string) =>
					httpClient.delete(
						API_END_POINTS.services.service_category.delete,
						params
					),
			},
			service: {
				post: (data: string) =>
					httpClient.post(API_END_POINTS.services.service.post, data),
				getById: (params?: string) =>
					httpClient.get(API_END_POINTS.services.service.getById, params),
				getAll: (params?: string) =>
					httpClient.get(API_END_POINTS.services.service.get, params),
				put: (params: string, data: string) =>
					httpClient.update(API_END_POINTS.services.service.put, params, data),
				patch: (params: string, data: string) =>
					httpClient.patch(API_END_POINTS.services.service.patch, params, data),
			},
		},
		spare_parts: {
			getAll: (params: string) =>
				httpClient.get(API_END_POINTS.spare_parts.getAll, params),
			post: (data: string) =>
				httpClient.post(API_END_POINTS.spare_parts.post, data),
			getById: (params: string) =>
				httpClient.get(API_END_POINTS.spare_parts.getById, params),
			put: (params: string, data: string) =>
				httpClient.update(API_END_POINTS.spare_parts.put, params, data),
			delete: (params: string) =>
				httpClient.delete(API_END_POINTS.spare_parts.delete, params),
			patch: (params: string, data: string) =>
				httpClient.patch(API_END_POINTS.spare_parts.patch, params, data),
		},
		booking_cart: {
			post: (data: string) =>
				httpClient.post(API_END_POINTS.booking_cart.post, data),
			getAll: (params: string) =>
				httpClient.get(API_END_POINTS.booking_cart.get, params),
			delete: (params: string) =>
				httpClient.delete(API_END_POINTS.booking_cart.delete, params),
			put: (params: string, data: string) =>
				httpClient.update(API_END_POINTS.booking_cart.put, params, data),
			getById: (params: string) =>
				httpClient.get(API_END_POINTS.booking_cart.getById, params),
			deleteProduct: (data: any) =>
				httpClient.delete(
					API_END_POINTS.booking_cart.deleteProduct
						.replace(':cartId', data?.cartId)
						.replace(':productId', data?.productId)
				),
			deleteService: (data: any) =>
				httpClient.delete(
					API_END_POINTS.booking_cart.deleteService
						.replace(':cartId', data?.cartId)
						.replace(':serviceId', data?.serviceId)
				),
		},
		service_bookings: {
			post: (data: string) =>
				httpClient.post(API_END_POINTS.service_bookings.post, data),
			getAll: (params: string) =>
				httpClient.get(API_END_POINTS.service_bookings.get, params),
			put: (params: string, data: string) =>
				httpClient.update(API_END_POINTS.service_bookings.put, params, data),
			patch: (params: string, data: string) =>
				httpClient.patch(API_END_POINTS.service_bookings.patch, params, data),
		},

		offer: {},
		auth: {
			login: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_login, data),
			signUp: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_signup, data),
			forgotPassword: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_forgot_password, data),
			resetPassword: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_reset_password, data),
			verify_otp: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_verify_otp, data),
			resend_otp: (data: string) =>
				httpClient.post(API_END_POINTS.auth.post_resend_otp, data),
			getUserProfile: (params: string) =>
				httpClient.get(API_END_POINTS.auth.get, params),
			updateUserProfile: (data: string) =>
				httpClient.update(API_END_POINTS.auth.put, data),
		},
		notification: {
			getAll: (params: string) =>
				httpClient.get(API_END_POINTS.notification.getAll, params),
			update: (params: any) =>
				httpClient.update(
					API_END_POINTS.notification.update.replace(':uuid', params.uuid),
					params
				),
		},

		bookings: {
			getAll: (params: string) =>
				httpClient.get(API_END_POINTS.bookings.getAll, params),
			postProduct: (data: any) =>
				httpClient.post(API_END_POINTS.bookings.postProduct, data),
			postService: (params: string) =>
				httpClient.post(API_END_POINTS.bookings.postService, params),
		},

		enquiry: {
			post: (data: any) => httpClient.post(API_END_POINTS.enquiry.post, data),
			getAll: (data: any) =>
				httpClient.get(API_END_POINTS.enquiry.getAll, data),
			update: (params: string, data: any) =>
				httpClient.update(API_END_POINTS.enquiry.update, params, data),
		},
	};
}
export default Client;
