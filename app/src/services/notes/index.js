import axios from 'axios';
import {getToken} from  '../../helper/token'

export const getAllNotes = () => {
  return axios
    .get('/api/v1/notes', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const createNote = (noteToAddToState) => {
  return axios
    .post(
      '/api/v1/notes/note',
      noteToAddToState,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const findNote = (id) => {
  return axios
    .get(`/api/v1/notes/note/${id}`,{
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      const { data } = response;
      return data;
    });
};
