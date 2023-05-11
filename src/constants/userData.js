const userData = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
export const userId = JSON.parse(userData).userId;
export const accessToken = JSON.parse(userData).access_token;

export const businessId = localStorage.getItem('singleBusinessId') || '';
