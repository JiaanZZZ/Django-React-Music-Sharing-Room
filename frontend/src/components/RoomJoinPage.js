import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { TextField,Button,Grid,Typography } from '@material-ui/core'
import {Link} from "react-router-dom"

export function RoomJoinPage() {

  const[roomCode,setRoomCode] =useState("")
  const[error,setError] =useState("")
  let field_roomcode="code"
  let history = useHistory();
  let obj={}

  obj[field_roomcode]=roomCode

  const roomButtonPressed=()=>{
    const requestOptions ={
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(obj)
    }

    fetch('/api/join-room',requestOptions)
    .then((response) => {
      if(response.ok){
        history.push(`/room/${roomCode}`)
      }  else {
        setError("Room not found.")
      }
    }).catch((error)=>{
      console.log(error)
    })
    
  }
    

  
  return (
    <div>
      <Grid container spacing={1} >
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={e=>setRoomCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary"  onClick={roomButtonPressed}>
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
