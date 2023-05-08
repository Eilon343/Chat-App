export const host = "https://chat-app-api-wqkh.onrender.com";

//exporting user api routes
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
//exporting message api routes
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getMessagesRoute = `${host}/api/messages/getmsgs`;
