// export const setCookie = (name, value, days = 7, path = '/') => {
// 	console.log('setting cookie');
// 	const expires = new Date(Date.now() + days * 864e5).toUTCString();
// 	document.cookie =
// 		name +
// 		'=' +
// 		encodeURIComponent(value) +
// 		'; expires=' +
// 		expires +
// 		'; path=' +
// 		path +
// 		'; secure=true';
// };

// export const getCookie = (name) => {
// 	return document.cookie.split('; ').reduce((r, v) => {
// 		const parts = v.split('=');
// 		return parts[0] === name ? decodeURIComponent(parts[1]) : r;
// 	}, '');
// };

// export const deleteCookie = (name, path) => {
// 	setCookie(name, '', -1, path);
// };

export const setCookie = (name, value, days) => {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + JSON.stringify(value) + expires + '; path=/';
};

export const getCookie = (name) => {
	let nameEQ = name + '=',
		ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
	}

	return null;
};

export const deleteCookie = (name) => {
	setCookie(name, '', -1);
};
