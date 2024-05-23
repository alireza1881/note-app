import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Stack } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Portal.css'

export default function Portal({ id, close, noteInfo, notes, newNote, editedNote }) {
    const [userInput, setUserInput] = useState('')
    const [colors, setColors] = useState(["rgba(253, 189, 189, 0.5)",
        "rgba(255, 222, 180, 0.5)", "rgba(188, 181, 255, 0.5)",
        "rgba(250, 255, 180, 0.5)", "rgba(192, 255, 180, 0.5)",
        "rgba(181, 255, 245, 0.5)", "rgba(182, 214, 255, 0.5)"])
    const [isInputdisabled, setIsInputdisabled] = useState(Boolean(noteInfo))
    let lastColor = notes[0] && notes[0].color
    let colorIndex = colors.findIndex(color =>{
        return color == lastColor
    })
    const checkValue = event => {
        setUserInput(event.target.value)
    }
    const submitNote = () => {
        if (userInput) {
            let now = new Date()
            let year = now.getFullYear()
            let month = now.getMonth() + 1
            let day = now.getDate()
            let hour = now.getHours()
            let min = now.getMinutes()
            if (min < 10) {
                min = `0${min}`
            }
            let date = [year, month, day, hour, min]
            if (noteInfo) {
                if (noteInfo.text != userInput) {
                    let edited = { text: userInput, date }
                    editedNote(edited)
                }
            } else {
                let randomColor
                do{
                    randomColor = Math.floor(Math.random() * 7)
                }while(colorIndex == randomColor)
                let noteObj = {
                    id,
                    text: userInput,
                    date,
                    color: colors[randomColor]
                }
                newNote(noteObj)
            }
            close(null)
        } else {
            alert('type something:t')
        }
    }
    useEffect(() => {
        if (noteInfo) {
            setUserInput(noteInfo.text)
        }
    }, [])
    const editHandler = () => {
        setIsInputdisabled(prev => !prev)
    }

    return ReactDOM.createPortal(
        <Box className='parent-modal'>
            <Box className='portal'>
                <Stack className="portal-header">
                    <DoneIcon className="portal-btn" color="action" onClick={submitNote} />
                    <Box>
                        {noteInfo ?
                            <>
                                <EditIcon className="portal-btn" color="action" fontSize="small" onClick={editHandler} />
                                <DeleteIcon className="portal-btn" color="action" fontSize="small" onClick={() => close(noteInfo.id)} />
                            </>
                            : <></>}
                        <CloseIcon className="portal-btn" color="action" onClick={() => close(null)} />
                    </Box>
                </Stack>
                <Box className='portal-body'>
                    <textarea className="portal-input" placeholder="type a note ..." onChange={checkValue} value={userInput} disabled={noteInfo ? isInputdisabled : false}></textarea>
                </Box>
            </Box>
        </Box>,
        document.getElementById('parent-modal')
    )
}