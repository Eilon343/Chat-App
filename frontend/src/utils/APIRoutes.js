export const host = process.env.REACT_APP_API_ENDPOINT;
//exporting user api routes
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const firebaseLoginRoute = `${host}/api/auth/firebaselogin`;
export const checkUsernameRoute = `${host}/api/auth/checkusername`;
//exporting message api routes
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getMessagesRoute = `${host}/api/messages/getmsgs`;
