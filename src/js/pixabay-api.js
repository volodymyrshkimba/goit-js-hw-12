import axios from "axios";

export const fetchByUserKey = (userKey, page) => {
	return axios.get('https://pixabay.com/api/', {
		params: {
			key: '45426984-94cd792edc1ba8c0f2dda7afb',
			q: `${userKey.trim()}`,
			image_type: 'photo',
			orientation: 'horizontal',
			safesearch: true,
			per_page: 15,
			page,
	}
	});

	
}