import {noteType} from "../components/note/note-type";
import {ALL_ACTIONS} from "./context/action/Action";

export type childrenType = {
  children: JSX.Element;
};
export type StateType = {
  Note: noteType[];
  mode: boolean;
  editedNote: noteType | null;
};
export type actionType = {
  type: ALL_ACTIONS;
  payload: any;
};
