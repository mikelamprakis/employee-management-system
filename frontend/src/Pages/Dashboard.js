import React,{useState, useEffect} from 'react';
import {fetchUserData} from '../Api/AuthService'
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

export const Dashboard = (props) => {

    const [userInfo,setUserInfo]=useState({});
    
    useEffect( ()=>{
        fetchUserData().then((res) => {
            setUserInfo(res.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])
        
    const getUserId = userInfo.userId 
    const getFirstName = userInfo.firstName 
    const getLastName = userInfo.lastName 
    const getUserName = userInfo.userName 
    
    const getListOfRoles = userInfo.roles ?? []
    
    const renderRoles = getListOfRoles.map( (role) => {
            const roleId = role.id
            const roleCode = role.roleCode
            const roleDescription = role.roleDescription
            const authority = role.authority
            return (
                <div>          
                    <h5>Role ID : {roleId} | Role Code : {roleCode} | Role Description : {roleDescription} | Authority : {authority} </h5>
               </div>
                )
    })


    const renderButtons = getListOfRoles.map( (role) => {
            if (role.authority === 'ADMIN'){
                return (
                    <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        <div class="col">
                        <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() =>goToListOfUsers()}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        List Of Users
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to view the details of all the users currectly registered in the system</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>1a</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>
        
                        <div class="col">
                            <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() => goToCreateUser()}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        Add New User
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to add new user and user details in the system</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>2a</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>
        
                        <div class="col">
                            <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() => goToListOfRequests()}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        Staff Requests
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to view the details of all the users currectly registered in the system</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>3a</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                )
            }else if(role.authority === 'USER'){
                return (
                    <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

                        <div class="col">
                        <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() => goToUserRequests(getUserId)}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        My Requests
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to view the all your day-off requests with the response status from the admin.</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>1u</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>

                        <div class="col">
                            <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() => viewInbox(getUserId)}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        View Inbox
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to view your group and 1-to-1 chats in your inbox and respond to your messages.</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>2u</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>

                        <div class="col">
                            <Link class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" onClick={() =>createRequest(getUserId)}>
                            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" >
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                        Create Request
                                </h2>
                                <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <small> Click here to apply for holiday leave or unpaid leave.</small>
                                </li>
                                <li class="d-flex align-items-center">
                                    <svg class="bi me-2" width="1em" height="1em"></svg>
                                    <small>3u</small>
                                </li>
                                </ul>
                            </div>
                            </div>
                            </Link>
                        </div>

                    </div>
                )
            }
        })

    const goToListOfUsers= () =>{
         props.history.push('/users');
    }   
    
    const logOut=()=>{
        localStorage.clear();
        props.history.push('/');
    }

    const goToCreateUser=()=>{
        props.history.push('/create-user/');
    }

    const viewInbox=(id)=>{
        props.history.push(`/view-inbox/${id}`);
    }

    const createMessage=(id)=>{
        props.history.push(`/create-message/${id}`);
    }

    const createRequest=(id)=>{
        props.history.push(`/create-request/${id}`);
    }

    const goToUserRequests=(id)=>{
        props.history.push(`/user-requests/${id}`);
    }

    const goToListOfRequests=()=>{
        props.history.push('/view-requests/');
    }


    return (
        <div>
        
        <NavBar />

        <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Welcome {getUserName}</h1>
                <p class="lead text-muted"> 
                <h4><strong> User Details </strong></h4>        
                <h4>User ID : {getUserId} | First Name : {getFirstName} | Last Name : {getLastName} | UserName : {getUserName}</h4> 
                {renderRoles}
                </p>
                <p>
                    <a href="#" class="btn btn-primary my-2" onClick={() => viewInbox(getUserId)}>Open Messages</a>
                    <a href="#" class="btn btn-secondary my-2" onClick={() => createMessage(getUserId)}>Initialize Conversation</a>
                </p>
            </div>
            </div>
        </section>
        </main>

        <div class="container px-4 py-5" id="custom-cards">
            {renderButtons}
        </div>

        <section class="py-5 text-center container">
            <div class="container">
            <Button style={{marginTop:'5px'}} onClick={() => logOut()}>Logout</Button>
            </div>
        </section>

    </div>
    )
}
