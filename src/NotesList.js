import React from "react";
import Note from "./Notes.js";

const Notelist = (props) => {
  /*boolean for determining if results should show,
  false results will be hidden based on whether or not 
  the x was selected*/
  const keepSearchMatches = (note) => note.doesMatchSearch;
  /* callback function for setting up filter, so only true notes get mapped over 
  and passed to noteElements, which will render them */
  const searchMatches = props.notes.filter(keepSearchMatches);

  const renderNote = (note) => (
    <Note
      onType={props.onType}
      note={note}
      key={note.id}
      removeNote={props.removeNote}
    />
  );
  const noteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};
export default Notelist;
