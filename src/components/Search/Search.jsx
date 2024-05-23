import { Stack, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import "./Search.css"

export default function Search({notesProps, searchInNotes }) {
    const [searchInput, setSearchInput] = useState("")
    useEffect(() => {
        let NotesArray = JSON.parse(localStorage.getItem('notes'))
        let searchedValue = NotesArray.filter(note=>{
            return note.text.includes(searchInput)
        })
        searchInNotes(searchedValue)
    }, [searchInput])
    const checkInput = event => {
        setTimeout(() => {
            setSearchInput(event.target.value)
        }, 500);
    }
    return (
        <Stack className='header'>
            <Typography className='search-box' sx={{ width: { xs: '90%', sm: '50%', lg: '30%' }, }}>
                <input placeholder='search...' onKeyDown={checkInput} />
                <SearchIcon color='action'/>
            </Typography>
        </Stack>
    )
}