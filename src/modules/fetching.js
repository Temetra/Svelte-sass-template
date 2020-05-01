export function waitFor(ms) {
	return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export function checkResponse(response) {
	if (!response.ok) throw { message:response.statusText, status:response.status };
	else return response;
}