import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton } from "@mui/material";

function NoteCard(props) {
  function handleDelete() {
    props.deleteNote(props.id);
  }
  function handelPin() {
    props.pinNote(props.id);
  }
  function handleOpen(){
    props.onClick(props.id);
  }
  return (
    <div className="card">
      <div onClick={handleOpen}>
        <h3 className="title">{props.note.title}</h3>
        <p className="tagline">{props.note.tagline}</p>
        <p className="content">{props.note.content}</p>
      </div>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={handelPin}>
        {!props.note.pin ? <PushPinOutlinedIcon /> : <PushPinIcon />}
      </IconButton>
    </div>
  );
}

export default NoteCard;
