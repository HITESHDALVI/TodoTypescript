import {deleteNote} from "../../services/api/api";
import {
  DELETE_NOTE,
  SET_NOTE_FOR_EDIT,
} from "../../utilis/context/action/Action";
import {useReducerState} from "../../utilis/context/state/state";
import Card from "../card/Card";
import "./Notes.css";
import {Color, noteProps} from "./note-type";
import {FaTrash, FaEdit} from "react-icons/fa";

function formatDate(date: Date) {
  const options = {day: "2-digit", month: "short", year: "numeric"};
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const [month, day, year] = formattedDate.split(" ");
  const capitalizedMonth = month.toUpperCase();

  return `${day} ${capitalizedMonth} ${year}`;
}
const Notes = (props: noteProps) => {
  const {state, dispatch} = useReducerState();
  const handledelete = (id: string) => {
    deleteNote(id);
    dispatch({type: DELETE_NOTE, payload: id});
  };
  const handleEdit = (id: string) => {
    const findNote = state.Note.find((item) => item.id === id);
    if (findNote) dispatch({type: SET_NOTE_FOR_EDIT, payload: findNote});
  };
  return (
    <Card color={props.priority && Color[props.priority]}>
      <>
        {props.text}
        <div className="date">{formatDate(props.updated_at)}</div>
        <div className="action-icon">
          <FaEdit
            onClick={() => handleEdit(props.id)}
            size={18}
            color="orange"
            style={{margin: "0 10px"}}
          />
          <FaTrash
            onClick={() => handledelete(props.id)}
            size={18}
            color="orange"
          />
        </div>
      </>
    </Card>
  );
};
export default Notes;
