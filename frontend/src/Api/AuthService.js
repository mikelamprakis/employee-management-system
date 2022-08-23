import React from 'react';
import axios from 'axios';

  
const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/auth/login`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const saveNewUser=(user)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/create/user`,
        'data': user,
         headers : {
            'Authorization':'Bearer '+getToken(),
            'Content-Type':'application/json'
        }
    })
}


export const fetchAllUsers=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/users`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserById=(id)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/users/` + id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const deleteUserById=(id)=>{
    return axios({
        method:'DELETE',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/users/delete/` + id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}


export const updatewUser=(id, user)=>{
    return axios({
        'method':'PUT',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/users/edit/` + id,
        'data': user,
         headers : {
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchInboxByUserId=(id)=>{
    console.log("Im here mate...")
    return axios({
        method:'GET', 
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/inbox/user/` + id,
        headers:{
            'Authorization':'Bearer ' +getToken()
        }
    })
}


export const initiateChatWithMessage=(userId, messsage)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/user/chat/create/` + userId,
        'data': messsage,
         headers : {
            'Authorization':'Bearer ' +getToken(),
            'Content-Type':'application/json',
            'Content-Encoding' : 'identity',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    })
}

export const fetchUsersByChatId=(chatid)=>{
    console.log("Im here mate...")
    return axios({
        method:'GET', 
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/users/chats/` + chatid,
        headers:{
            'Authorization':'Bearer ' +getToken()
        }
    })
}

export const fetchChatByChatId= (chatId) => {
    return axios({
        method : 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8081'}/api/v1/user/chat/` + chatId,
        headers: {
            'Authorization':'Bearer ' + getToken()
        }
    })
}

export const sendMessageToChat=(userId, chatId,  messsage)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/user/chat/send/` + userId + `/` + chatId,
        'data': messsage,
         headers : {
            'Authorization':'Bearer ' +getToken(),
            'Content-Type':'application/json',
        }
    })
}

export const saveNewRequest=(userId, request)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8081'}/api/v1/request/create/` + userId ,
        'data': request,
         headers : {
            'Authorization':'Bearer ' +getToken(),
            'Content-Type':'application/json',
        }
    })
}

export const fetchAllRequests=()=>{
    return axios({
        method:'GET', 
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/requests/all` ,
        headers:{
            'Authorization':'Bearer ' +getToken()
        }
    })
}

export const updateNewStatus=(requestId, request)=>{
    return axios({
        method:'POST', 
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/request/response/` + requestId ,
        data: request,
        headers:{
            'Authorization':'Bearer ' +getToken()
        }
    })
}

export const fetchRequestsByUserId=(userId)=>{
    return axios({
        method:'GET', 
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/requests/user/` + userId ,
        headers:{
            'Authorization':'Bearer ' +getToken()
        }
    })
}