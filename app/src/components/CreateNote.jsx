import { useState } from 'react';

export const CreateNote = ({addNote}) => {
    const [newNote, setNewNote] = useState();


    const handleChange = (event) => {
        setNewNote(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const noteToAddToState = {
          body: newNote,
          title: 'TEST II',
        };
        addNote(noteToAddToState)
        setNewNote('')
    };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name=''
          id=''
          onChange={handleChange}
          value={newNote}
        />
        <button>Crear Nota</button>
      </form>
    </>
  )
}
