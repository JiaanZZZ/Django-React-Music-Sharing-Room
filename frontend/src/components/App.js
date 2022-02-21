import React from 'react';
import {CreateRoomPage} from './CreateRoomPage';
import { HomePage } from "./HomePage"
import {RoomJoinPage} from './RoomJoinPage';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import { Room } from './Room';
import ReactDOM from 'react-dom';

export function App() {
 
      return (
      <div className='center'>
        
    <BrowserRouter>
        <Switch>
            <Route exact path='/'>
                <HomePage/>
            </Route> 
            <Route path='/join'>
                <RoomJoinPage/>
            </Route>
            <Route path='/create'>
                <CreateRoomPage/>
            </Route> 
            <Route path='/room/:roomCode'>
                <Room />
            </Route> 
            </Switch>
    
      </BrowserRouter>
        </div>
          )
  
}


