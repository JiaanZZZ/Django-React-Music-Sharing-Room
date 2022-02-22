
import React ,{ useState} from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { Button,Grid,Typography } from '@material-ui/core'



export function Room({leaveRoomCallback}) {
   let history = useHistory()
    const defaultVotes=2
    const[guestCanPause,setGuestCanPause]=useState(false)
    const[votesToSkip,setVotesToSkip]=useState(2)
    const[isHost,setIsHost]=useState(false)
    const[showSetings, setShowSettings]=useState(false)
    const { roomCode } = useParams()
    
    const leaveButtonPressed=()=>{
      const requestOptions={
        method:"POST",
        headers:{'Content-Type':'application/json'}
      }
      fetch('/api/leave-room',requestOptions)
      .then(response=>{history.push('/')})

    }

const updateShowSettings=(value)=>{
  setShowSettings(value)

}

const renderSettingsButton=(value)=>{
  return(
    <Grid item xs={12} align="center">
      <Button variant="contained" color="primary" onClick={updateShowSettings(true)}>
        Settings
      </Button>

    </Grid>
  )

}


   const getRoomDetails=()=>{
       fetch('/api/get-room'+'?code='+roomCode)
       .then(response=> {
         if (!response.ok){
           leaveRoomCallback()
           history.push("/")

         } 
         return response.json()
       } )
       .then((data)=>{
           setVotesToSkip(data.votes_to_skip),
           setGuestCanPause(data.guest_can_pause),
           setIsHost(data.is_host)

       })

    }
    getRoomDetails()
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant='h4' component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <Typography variant='h4' component="h4" >
           Votes:{votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <Typography variant='h6' component="h6">
      Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <Typography variant='h6' component="h6">
        isHost:{isHost.toString()}
        </Typography>
      </Grid>
      {isHost? renderSettingsButton():null}
      <Grid item xs={12} align="center">
      <Button variant='contained' color="secondary" onClick={leaveButtonPressed} >
        Leave Room
      </Button>
      </Grid>

    </Grid>
  )
}
