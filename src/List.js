import React, { Component } from 'react';
class List extends Component{
  state = {
    notes: [],
    currentNote: "",
    noteEditing: null,
    currentEdit: ""
  };
  addNote = () => {
    let notes = [...this.state.notes];
    notes.push(this.state.currentNote);
    this.setState({ notes, currentNote: "" });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes.length !== this.state.notes.length) {
      const json = JSON.stringify(this.state.notes);
      localStorage.setItem("notes", json);
    }
  }
  componentDidMount() {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      this.setState(() => ({ notes }));
    }
  }
  
setNoteEditing = index => {
  this.setState({ noteEditing: index, currentEdit: this.state.notes[index] });
};

editNote = event => {
  this.setState({ currentEdit: event.target.value });
};

submitEdit = index => {
  let notes = [...this.state.notes];
  notes[index] = this.state.currentEdit;
  this.setState({ notes, noteEditing: null });
};

  render(){
    
    return (
      <div>
       <h1>localStorage Note-Taking Demo</h1>
       <textarea
          onChange={event => this.setState({ currentNote: event.target.value })}
          value={this.state.currentNote}
          className="input"
          placeholder="Notes"
        />
        <br/>
        <button className="button" onClick={this.addNote} >Submit</button>
        
        {
        this.state.notes.map((note, index) => (
          <div className="notes" key={index}>
            {this.state.noteEditing === null ||
            this.state.noteEditing !== index ? (
              <div className="note">
                <div className="note-content">
                  <div className="note-text">{note}</div>
                  <button onClick={() => this.setNoteEditing(index)}>
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="note">
                <div className="note-content">
                  <input
                  type="text"
                  value={this.state.currentEdit}
                    onChange={event => this.editNote(event)}
                  />
                  <button onClick={() => this.submitEdit(index)}>Done</button>
                </div>
              </div>
          )}
        </div>
        ))
        }
     </div>

    );
    }
    

}

export default List;