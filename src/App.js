import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [],
    searchText: ""
  };

  addNote = () => {
    /*creates new note*/
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    /*adds new note to current notes array in state*/
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    /*editMeId == id of the note that is edited*/
    /*updatedKey == title or value description field*/
    /*updatedValue == value of the title or description that user entered*/
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        /*returning since this is not the note being changed*/
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  /*search function of app*: receives text and interacts with both Header.js
  and App.js*/
  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      /*when doesMatchSearch = true, allows for ____
       */
      if (!newSearchText) {
        /*if no text is searched, just return all notes so user can view them*/
        note.doesMatchSearch = true;
        return note;
      } else {
        /*lowercase conversion allows strings to be matched*/
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        /*does the title match what is being searched?*/
        const titleMatch = title.includes(newSearchText);
        /*does the description match what is being searched?*/
        const descriptionMatch = description.includes(newSearchText);
        /*this test if both titleMatch and descriptionMatch have true values*/
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({ notes: updatedNotes, searchText: newSearchText });
  };
  /* filter notes and only returns note that do not match the id of 
    note we want to delete*/
  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;

/*ReactDOM.render(<HederSection />, rootElement); */
