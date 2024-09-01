import axios from './axios.customize';

const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = '/api/v1/user';
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone
  }
  return axios.post(URL_BACKEND, data);
}

const updateUserApi = (_id, fullName, phone) => {
  const URL_BACKEND = '/api/v1/user';
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone
  }
  return axios.put(URL_BACKEND, data);
}

const deleteUserApi = (_id) => {
  const URL_BACKEND = `/api/v1/user/${_id}`;
  return axios.delete(URL_BACKEND);
}

const fetchAllUserApi = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
  const URL_BACKEND = '/api/v1/file/upload';
  const config = {
    headers: {
      "upload-type": folder,
      'Content-Type': 'multipart/form-data'
    }
  }

  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', file);

  return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatarApi = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
    avatar: avatar
  }

  return axios.put(URL_BACKEND, data);
}

export {
  createUserApi, updateUserApi, fetchAllUserApi,
  deleteUserApi, handleUploadFile, updateUserAvatarApi
}