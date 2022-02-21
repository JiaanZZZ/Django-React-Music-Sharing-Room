
import React ,{ useState} from 'react'
import { useParams } from 'react-router-dom'

export function Room() {
    const defaultVotes=2
    const[guestCanPause,setGuestCanPause]=useState(false)
    const[votesToSkip,setVotesToSkip]=useState(2)
    const[isHost,setIsHost]=useState(false)
    const { roomCode } = useParams()
    
    


   const getRoomDetails=()=>{
       fetch('/api/get-room'+'?code='+roomCode)
       .then(response=> response.json())
       .then((data)=>{
           setVotesToSkip(data.votes_to_skip),
           setGuestCanPause(data.guest_can_pause),
           setIsHost(data.is_host)

       })

    }
    getRoomDetails()
  return (
    <div>
        <h3>{roomCode}</h3>
       <p>Votes:{votesToSkip}</p> 
       <p> Guest Can Pause: {guestCanPause.toString()}</p>
       <p> isHost:{isHost.toString()}</p>
    </div>
  )
}
