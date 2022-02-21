import React, { useEffect, useState,useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Grid, Link,RadioGroup,
          FormControlLabel,Radio,Typography, TextField,
           FormControl, FormHelperText } from '@material-ui/core'

export function CreateRoomPage() {
  const defaultVotes=2
  const[guestCanPause,setGuestCanPause]=useState(true)
  const[votesToSkip,setVotesToSkip]=useState(2)
  let history = useHistory();
  
  let field_v="votes_to_skip"
  let field_g="guest_can_pause"
  let obj={}

  obj[field_v]=votesToSkip
  obj[field_g]=guestCanPause
    



  const handleVotesChange=(e)=>{
     setVotesToSkip(e.target.value)
    
   
  }
  const handleGuestCanPauseChange=(e)=>{
     e.target.value==="true"? setGuestCanPause(true):setGuestCanPause(false)
    
  }

  
 
  const handleRoomButtonPressed=()=>{


      const requestOptions ={
        method:'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
      }

      fetch('/api/create-room',requestOptions)
      .then((response) => response.json())
      .then(data=>history.push("/room/"+data.code))
    }
      
  
  
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component='h4' variant='h4'>
           Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
              <FormHelperText>
                <div align='center'>
                    Guest Control of Playback State
                </div>
              </FormHelperText>
             
                <RadioGroup row defaultValue={true} onChange={handleGuestCanPauseChange}>
                <FormControlLabel 
                      value="true" 
                      control={<Radio color="primary" />} 
                      label="Play/Pause"
                      labelPlacement='bottom'/>
                  <FormControlLabel 
                      value="false" 
                      control={<Radio color="secondary" />} 
                      label="No Control"
                      labelPlacement='bottom'/>
                </RadioGroup>
            </FormControl>
        </Grid>  
          <Grid item xs={12} align='center'>
            <FormControl>
              <TextField 
                    required={true} 
              
      
                    onChange={handleVotesChange}
                    type="number" 
                    defaultValue={defaultVotes}
                    inputProps={{
                      min:1,
                      style:{textAlign:"center"}}}
                              />
                              <FormHelperText>
                                <div align="center">
                                  Votes Required to Skip Songs
                                </div>
                              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create A Room</Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
          </Grid>
      </Grid>
    </div>
  )
}
