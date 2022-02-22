import {CreateRoomPage} from './CreateRoomPage';
import { HomePage } from "./HomePage"
import {RoomJoinPage} from './RoomJoinPage';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { Room } from './Room';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


export function App() {

    const[roomCode,setRoomCode]=useState(null)

    useEffect(()=>{
      fetch("/api/user-in-room")
      .then(response=>response.json())
      .then(data=>{setRoomCode(data.code)})
  
    },[roomCode])
 
      const clearRoomCode =()=>{
        setRoomCode(null)
      }

      return (
      <div className='center'>
        
    <BrowserRouter>
        <Switch>
            <Route exact path='/'
             render={()=>{
                return roomCode?(
                    <Redirect to={`/room/${roomCode}`}/>
                ):(
                    <HomePage/>)
            }} >
           
             
            </Route> 
            <Route path='/join'>
                <RoomJoinPage/>
            </Route>
            <Route path='/create'>
                <CreateRoomPage/>
            </Route> 
            <Route path='/room/:roomCode'
              render={()=>{
                return  <Room levelRoomCallback={clearRoomCode}/>
              }}>
               
            </Route> 
            </Switch>
    
      </BrowserRouter>
        </div>
          )
  
}


