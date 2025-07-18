export const formatDateTime = (isoDate: string): string => {
	const date = new Date(isoDate);

	const istOffset = 5.5 * 60 * 60 * 1000;
	const istDate = new Date(date.getTime() + istOffset);

	const day = istDate.getDate().toString().padStart(2, '0');
	const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
	const year = istDate.getFullYear();

	let hours = istDate.getHours();
	const minutes = istDate.getMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';

	hours = hours % 12;
	hours = hours ? hours : 12;

	const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

	return `${day}-${month}-${year} - ${time}`;
};
