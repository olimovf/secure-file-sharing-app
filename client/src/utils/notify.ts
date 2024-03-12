import { toast, ToastOptions } from 'react-toastify';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

const notify = (
	message: string,
	type: NotificationType = 'info',
	options?: ToastOptions,
) => {
	const toastOptions: ToastOptions = {
		autoClose: 3000,
		position: 'bottom-right',
		pauseOnHover: true,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: 'dark',
		...options,
	};

	switch (type) {
		case 'info':
			toast.info(message, toastOptions);
			break;
		case 'success':
			toast.success(message, toastOptions);
			break;
		case 'warning':
			toast.warning(message, toastOptions);
			break;
		case 'error':
			toast.error(message, toastOptions);
			break;
		default:
			toast(message, toastOptions);
	}
};

export default notify;
