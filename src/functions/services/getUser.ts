import baseInstance from './config/axiosInstance';
import routes from './config/routes';

export const getUser = async (query: string, value: string | number) =>
  await (
    await baseInstance.get(routes.users.index + `?${query}=${value}`)
  ).data[0];

export const getContacts = async (query: string) => {
  await (
    await baseInstance.get(routes.users.index + `?${query}`)
  ).data[0];
};