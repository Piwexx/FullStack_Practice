import { useEffect, useState } from 'react';
import { Note } from './components/Note';
import { Login } from './components/Login';
import { Togglable } from './components/Togglable';
import { getAllNotes } from './services/notes/index';
import { CreateNote } from './components/CreateNote';
import { createNote, findNote } from './services/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState();

  const addNote = (newNote) => {
    createNote(newNote)
      .then((data) => {
        return findNote(data.id);
      })
      .then((note) => {
        setNotes((prevNotes) => prevNotes.concat(note));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllNotes()
      .then((notes) => {
        setNotes(notes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const loggetUser = JSON.parse(localStorage.getItem('user'));
    if (loggetUser) {
      setUser(loggetUser);
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <h1>Create a new note</h1>
          <CreateNote addNote={addNote} />
          <ol>
            {notes.map((note) => (
              <Note key={notes.id} {...note} />
            ))}
          </ol>
        </>
      ) : (
        <>
          <Togglable buttonLabel='Show Login'>
            <Login />
          </Togglable>
        </>
      )}
    </>
  );
}

export default App;
