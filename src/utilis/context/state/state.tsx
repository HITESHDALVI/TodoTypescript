import {createContext, useContext, useReducer} from "react";
import {StateType, actionType, childrenType} from "../../context-type";

type reducerType = {
  state: StateType;
  dispatch: (action: actionType) => void;
};

export const stateContext = createContext<reducerType>({} as reducerType);

const initialState = {
  Note: [],
  mode: false,
  editedNote: null,
};

const reducer = (state: StateType, action: actionType) => {
  switch (action.type) {
    case "INIT_NOTES":
      return {...state, Note: action.payload};
    case "SET_EDIT_MODE":
      return {...state, mode: action.payload};
    case "SET_NOTE_FOR_EDIT":
      return {...state, mode: true, editedNote: action.payload};
    case "ADD_NOTE":
      return {...state, Note: [action.payload, ...state.Note]};
    case "UPDATE_NOTE": {
      const updatedNotes = state.Note.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        mode: false,
        Note: [...updatedNotes.sort((a, b) => b.updated_at - a.updated_at)],
      };
    }
    case "DELETE_NOTE": {
      const deleteNote = state.Note.filter(
        (item) => item.id !== action.payload
      );
      return {...state, Note: deleteNote};
    }
    default:
      return state;
  }
};
export const StateProvider = ({children}: childrenType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <stateContext.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </stateContext.Provider>
  );
};

export const useReducerState = () => {
  return useContext(stateContext);
};
