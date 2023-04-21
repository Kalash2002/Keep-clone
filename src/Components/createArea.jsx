import { Button, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddButton = styled(Button)({
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  padding: "0.6rem 5rem",
  margin: "0.6rem 0",
  
});
function CreateArea(props) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    tagline: "",
    content: "",
    pin: false,
  });


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

    

    function handleChange(event) {
      const { name, value } = event.target;

      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value,
        };
      });
    }

    function handelSubmit(event) {
      if (
        note.title?.length === 0 &&
        note.tagline?.length === 0 &&
        note.content?.length === 0
      ) {
        setOpen(true);
        console.log("empty",open);
        return;
      }
      props.addNote(note);
      setNote({
        title: "",
        tagline: "",
        content: "",
        pin: false,
      });
      event.preventDefault();
    }
  return (
    <form className="create-form" onSubmit={handelSubmit}>
      <Typography variant="h5" gutterBottom>
        Add a Note
      </Typography>
      <TextField
        name="title"
        onChange={handleChange}
        value={note.title}
        label="Heading here"
        className="input"
        margin="dense"
      />
      <TextField
        name="tagline"
        onChange={handleChange}
        value={note.tagline}
        label="Tagline here"
        className="input"
        margin="dense"
      />
      <TextField
        name="content"
        onChange={handleChange}
        value={note.content}
        label="Content here"
        className="input content"
        multiline
        margin="dense"
        rows={4}
      />
      <AddButton variant="contained" size="large" onClick={handelSubmit}>
        ADD
      </AddButton>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please Enter anyone of the field
        </Alert>
      </Snackbar>
    </form>
  );
}

export default CreateArea