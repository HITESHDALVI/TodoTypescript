import {useEffect} from "react";
import "./App.css";
import AddNote from "./components/add_note/AddNote";
import Notes from "./components/note/Notes";
import {useTheme} from "./utilis/context";
import {useReducerState} from "./utilis/context/state/state";
import {notesData} from "./services/api/api";
import {INIT_NOTES} from "./utilis/context/action/Action";
import NoDataFound from "./components/empty_data/NoDataFound";
import {noteType} from "./components/note/note-type";

function App() {
  const {theme} = useTheme();
  const {state, dispatch} = useReducerState();
  const getNotes = () => {
    notesData()
      .then((res) => {
        const {data} = res;
        dispatch({
          type: INIT_NOTES,
          payload: data.map((item: noteType) => ({
            ...item,
            created_at: new Date(item.created_at),
            updated_at: new Date(item.updated_at),
          })),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className={`App ${theme ? "dark" : "light"}`}>
      <h2>Notes App {state.Note.length}</h2>
      <AddNote />
      {state.Note.map((item) => (
        <Notes
          text={item.text}
          priority={item.priority}
          key={item.id}
          id={item.id}
          updated_at={item.updated_at}
          created_at={item.created_at}
        />
      ))}
      {state.Note.length <= 0 && <NoDataFound />}
    </div>
  );
}

export default App;
