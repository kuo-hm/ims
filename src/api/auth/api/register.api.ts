import { api } from '../../axios';

export const addNewUser = async (payload: IRegister) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};
