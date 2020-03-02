import React from 'react';
import store from './store';
import FoldersSidebar from './Sidebar/FoldersSidebar';
import NoteSidebar from './Sidebar/NoteSidebar';
import NotesList from './Notes/NotesList';
import NotePage from './Notes/NotePage';
import { Route, Link} from 'react-router-dom';
import './App.css';
import AppContext from './AppContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount{
    Promise.all([
      fetch(`${}/notes`)
      fetch(`${}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if(!notesRes.ok)
          return
        if (!foldersRes.ok)
          return 
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        // why console.error?
        console.error({error});
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(
        note => note.id !== noteId)
    });
  };


  render(){
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (
      <AppContext.Provider value={value}>
        <div className='app'>
          <header className='app-header'>
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

          {/* Nav Routes */}
          <div className='sidebar-nav'>
            <Route
              exact
              path='/'
              component={FoldersSidebar}/>
            <Route 
              exact
              path='/folders/:folderId'
              component={FoldersSidebar}/>
            <Route 
              exact 
              path='/notes/:noteId'
              component={NoteSidebar}/>
            <Route path='/add-folder' component={NoteSidebar} />
            <Route path='/add-note' component={NoteSidebar} />
          </div>

          {/* Main/Note Routes */}
          <main>
            <Route 
              exact
              path='/'
              component={NotesList}/>
            <Route 
              exact
              path='/folders/:folderId'
              component={NotesList}/>
            <Route 
              exact
              path='/notes/:noteId'
              component={NotePage}/>
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;