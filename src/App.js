import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Grid, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchItem from './components/Search/Search'
import Note from './components/Note/Note'
import Portal from './components/Portal/Portal';

function App() {
  const [isShowPortal, setIsShowPortal] = useState(false)
  const [notes, setNotes] = useState([])
  const [orgNotes, setOrgNotes] = useState([])
  const [idCounter, setIdCounter] = useState(1)
  const [selectedNote, setSelectedNote] = useState(null)
  const [isSearchMode, setIsSearchMode] = useState(false)

  const searchInNotes = (value) => {
    if(value != []){
        setIsSearchMode(true)
        setNotes(value)
    }
  }
  const closePortal = (noteId) => {
    setIsShowPortal(false)
    setSelectedNote(null)
    if (noteId) {
      removeNote(noteId)
    }
  }
  const removeNote = noteId => {
    let updatedNotes = notes.filter(note => {
      return note.id !== noteId
    })
    setNotes(updatedNotes)
  }
  const addNowNote = (value) => {
    setNotes(prev => [value, ...prev])
  }
  useEffect(() => {
    let getNotes = JSON.parse(localStorage.getItem('notes'))
    setOrgNotes(JSON.parse(localStorage.getItem('notes')))
    if (getNotes) {
      setNotes(getNotes)
    }
  }, [])
  useEffect(() => {
    setIdCounter(notes.length + 1)
    if(isSearchMode){
      setIsSearchMode(false)
      localStorage.setItem('notes', JSON.stringify(orgNotes))
    }else{
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes])
  const removeAll = () => {
    setNotes([])
  }
  const openPortal = (note) => {
    setIsShowPortal(true)
    setSelectedNote(note)
  }
  const editNote = (editedNote) => {
    let updatedNotes = notes.map(note => {
      if (note.id == selectedNote.id) {
        return { ...note, text: editedNote.text, date: editedNote.date }
      }
      return note
    })
    setNotes(updatedNotes)
  }
  return (
    <Container className='container'>
      <SearchItem notesProps={notes} searchInNotes={searchInNotes} />
      <Grid container spacing={2} className='notes-parent'>
        {notes ?
          notes.map(function (note) {
            return <Note key={note.id} {...note} openPortal={openPortal} />
          }) :
          <></>
        }
      </Grid>
      <Avatar className='avatar add-btn' variant='rounded' onClick={() => { setIsShowPortal(true) }}>
        <AddIcon color='action' />
      </Avatar>
      <Avatar className='avatar remove-all-btn' variant='rounded' onClick={() => removeAll()}>
        <DeleteIcon color='action' />
      </Avatar>
      {isShowPortal && <Portal id={idCounter} noteInfo={selectedNote} notes={notes} close={closePortal} newNote={addNowNote} editedNote={editNote} />}
    </Container>
  );
}

export default App;
