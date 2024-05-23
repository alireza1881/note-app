import { Grid, Paper, Typography, Box } from "@mui/material"
import './Note.css'

export default function Note(props) {
    let {id, text, date, color, openPortal}= props

    return (
        <Grid item xs={6} sm={4} md={3} onClick={() => { openPortal(props)}}>
            <Paper elevation={5} className='note-item' style={{backgroundColor: `${color}`}}>
                <Typography >{text.length > 60 ? text.slice(0, 60) + '...' : text}</Typography>
                <Box className='date-info' >
                    <Typography variant='span'>{`${date[0]}/${date[1]}/${date[2]}`}</Typography>
                    <Typography variant='span'>{`${date[3]}:${date[4]}`}</Typography>
                </Box>
            </Paper>
        </Grid>
    )
}