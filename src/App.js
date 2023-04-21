import { Pagination, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CreateArea from "./Components/createArea";
import Header from "./Components/header";
import NoteCard from "./Components/noteCard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function App() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [toEdit, setToEdit] = useState({});
  const [id, setId] = useState(0);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function handelPin(id) {
    const updatedNotes = notes.map((note, index) => {
      if (id === index) {
        note.pin = !note.pin;
      }
      return note;
    });
    setNotes(updatedNotes);
  }


  function handleClickOpen(id) {
    const currNote = notes.filter((note, index) => {
      return index === id;
    });
    setToEdit(currNote[0]);
    setId(id);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleSave(event) {
    
    const updatedNotes = notes.map((note, index) => {
      if (id === index) {
        note.title = event.target.title.value;
        note.tagline = event.target.tagline.value;
        note.content = event.target.content.value;
      }
      return notes;
    });
    setNotes(updatedNotes[0]);
    setOpen(false);
    event.preventDefault();
  }  
  

  return (
    <div className="App">
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((note, index) => {
        return (
          note.pin && (
            <NoteCard
              onClick={handleClickOpen}
              id={index}
              key={index}
              note={note}
              deleteNote={deleteNote}
              pinNote={handelPin}
            />
          )
        );
      })}

      {notes
        .slice(
          (page - 1) * 6,
          page * 6 <= notes.length ? page * 6 : notes.lenth
        )
        .map((note, index) => {
          return (
            !note.pin && (
              <NoteCard
                onClick={handleClickOpen}
                id={index}
                key={index}
                note={note}
                deleteNote={deleteNote}
                pinNote={handelPin}
              />
            )
          );
        })}
      <Pagination
      className="pagination"
        count={Math.ceil(notes.length / 6)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 50);
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <form className="form" onSubmit={handleSave}>
          <DialogTitle>
          <Typography variant="h5" gutterBottom>
          Edit Note
          </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              name="title"
              margin="dense"
              label="Title"
              type="text"
              defaultValue={toEdit.title}
            />
            <TextField
              autoFocus
              fullWidth
              name="tagline"
              margin="dense"
              label="Tagline"
              type="text"
              defaultValue={toEdit.tagline}
            />
            <TextField
              autoFocus
              fullWidth
              name="content"
              margin="dense"
              label="Content"
              type="text"
              multiline
              rows={4}
              defaultValue={toEdit.content}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default App;
