import React,{useState, useEffect} from 'react';
import {fetchInboxByUserId, fetchUserData} from '../Api/AuthService'
import NavBar from './NavBar';

export const ViewInbox = (props) => {

    const userIdFromParams = props.match.params.id; 

    const [userInfo,setUserInfo]=useState({});

     useEffect( ()=>{
        fetchUserData().then((res) => { 
            setUserInfo(res.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])
        
    const [listOfChats,setListOfChats]=useState([]);

    useEffect( ()=>{
        fetchInboxByUserId(userIdFromParams).then((res) => { 
           setListOfChats(res.data);
       }).catch((e)=>{
           localStorage.clear();
           props.history.push('/')
        })
   },[])

   const viewChatMessages = (id) => {
      props.history.push(`/view-messages/${id}`);
   }
   
    return (
        <div>
            <NavBar />
        <div className="container">
            <h1>{userInfo.userName} Messages</h1>
            <div className="row"> 
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Chat ID</th>
                            <th>From</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listOfChats.map(
                                chat =>
                                <tr key ={chat.id}>
                                    <td>{chat.id}</td>
                                    <td>{chat.chatWith}</td>
                                    <td>
                                        <button style={{marginLeft:"10px"}} onClick={ () => viewChatMessages(chat.id)} className="btn btn-info">View Messages</button>
                                    </td>  
                                </tr>
                            )                          
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )

}
