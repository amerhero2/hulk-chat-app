import React, { useEffect } from 'react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import './Dashboard.css'
import Button from '../../components/common/button/Button';
import Divider from '../../components/common/divider/divider';
import classNames from 'classnames';



const Dashboard = () => {
    const socket = useWebSocket();
    const rooms = [ {id: 1, label:'My test room'}, {id: 2, label:'My test two'}, {id: 3, label:'My test three'}];
    const users = [ {id: 1, firstName:"Amer", lastName: "Hero"}, {id: 2, firstName: "Amer", lastName: "Rohe" }, {id: 3, firstName: "Rohero", lastName: "Rosero" }];

    useEffect(() => {

        console.log('socket',socket)
        if(socket){
            socket.emit('message', { room: 'testingRoom', message: 'testing message' });
        }



    }, [socket]);

    useEffect(() => {
        console.log('doslooo')
    },[])


    useEffect(() => {
        if (socket) {
        socket.emit('joinRoom', 'testingRoom');

        // Listen for messages from the room
        socket.on('message', (newMessage) => {
            console.log("NEW MESSAGE", newMessage);
        });

        return () => {
            socket.off('message');
        };
        }
    }, [socket]);


    return(
        <div className='HULK-chat'>
            <div className='HULK-chat-side-content'>
                <div className='HULK-chat-side-content-rooms-wrapper'>
                    <Button>+ New room</Button>
                    <Divider label="Rooms" />
                    <div className='HULK-chat-side-content-rooms'>
                        {rooms.map((room) => {
                            return (
                                <div key={room.id} className={classNames('HULK-chat-side-content-rooms-room',{
                                    'HULK-chat-side-content-rooms-room-active': room.id === 1
                                })}>
                                    <div>{room.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='HULK-chat-side-content-users-wrapper'>
                    <Divider label="Users" />
                    <div className='HULK-chat-side-content-users'>
                        {users.map((user) => {
                            return (
                                <div key={user.id} className='HULK-chat-side-content-users-user'>
                                    <div className={classNames('HULK-chat-side-content-users-user-indicator',{
                                        'HULK-chat-side-content-users-user-indicator-active': user.id === 1
                                    })} />
                                    <div>{user.firstName} {user.lastName}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='HULK-chat-main-content'>
                <div className='HULK-chat-main-content-messages'>

                </div>
                <div className='HULK-chat-main-content-message-input'>
                    <input onChange={(e) => console.log(e)} placeholder='Type a message here...' />
                    <Button>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;