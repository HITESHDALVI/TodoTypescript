import "./addnote.css";
import "./addnote-type";
import {useEffect, useState} from "react";
import {noteType, priority} from "../note/note-type";
import {v4 as uuidv4} from "uuid";
import {addNoteType} from "./addnote-type";
import ThemeSwitch from "../common/ThemeSwitch";
import {useReducerState} from "../../utilis/context/state/state";
import {ADD_NOTE, UPDATE_NOTE} from "../../utilis/context/action/Action";
import {addNote, updateNote} from "../../services/api/api";

const AddNote = () => {
  const {state, dispatch} = useReducerState();
  const [note, setNote] = useState<addNoteType>({
    text: "",
    priority: "low",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNote({...note, text: e.target.value});
  };
  const setEditNote = (item: noteType) => {
    setNote({...note, text: item.text, priority: item.priority});
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const {mode, editedNote} = state;
    const noteData = {
      text: note.text,
      priority: note.priority,
      id: mode && editedNote ? editedNote.id : uuidv4(),
      created_at:
        mode && editedNote ? new Date(editedNote?.created_at) : new Date(),
      updated_at: new Date(),
    };
    if (mode && editedNote) {
      updateNote(editedNote.id, noteData);
      dispatch({
        type: UPDATE_NOTE,
        payload: noteData,
      });
    } else if (note.text) {
      addNote(noteData);
      dispatch({
        type: ADD_NOTE,
        payload: noteData,
      });
    }
    setNote({text: "", priority: "low"});
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setNote({...note, priority: e.target.value as priority});
  };
  useEffect(() => {
    if (state.editedNote && state.mode) {
      setEditNote(state.editedNote);
    }
  }, [state.mode, state.editedNote]);

  return (
    <div>
      <form className="add-note">
        <ThemeSwitch />
        <input
          type="text"
          onChange={handleChange}
          value={note.text}
          className="add-note-fields"
        />
        <select
          onChange={handleSelect}
          value={note.priority}
          className="add-note-fields"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick} className="add-note-fields">
          {state.mode ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
