import axios from "axios";
import {noteType} from "../../components/note/note-type";
export const URL = "http://localhost:3000";
export const notesData = async () => {
  return await axios({
    method: "get",
    url: `${URL}/notes?_sort=updated_at&_order=desc`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const addNote = async (note: noteType) => {
  return await axios({
    method: "post",
    url: `${URL}/notes`,
    headers: {
      "Content-Type": "application/json",
    },
    data: note,
  });
};
export const updateNote = async (id: string, note: noteType) => {
  return await axios({
    method: "put",
    url: `${URL}/notes/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: note,
  });
};

export const deleteNote = async (id: string) => {
  return await axios({
    method: "delete",
    url: `${URL}/notes/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
