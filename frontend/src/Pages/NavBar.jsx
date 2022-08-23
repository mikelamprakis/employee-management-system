import React,{useState, useEffect} from 'react';
import {fetchUserData} from '../Api/AuthService'
import {fetchAllRequests, updateNewStatus, deleteUserById} from '../Api/AuthService'
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom';

const NavBar = () => {

  
  let history = useHistory(); 


  const [userInfo,setUserInfo]=useState({});
    
    console.log("here 1")

     useEffect( ()=>{
        fetchUserData().then((res) => {
            setUserInfo(res.data);
        }).catch((e)=>{
            localStorage.clear();
            history.push('/')
        })
    },[])

    const getUserId = userInfo.userId 

    const getListOfRoles = userInfo.roles ?? []

    const renderButtons = getListOfRoles.map( (role) => {
      if (role.authority === 'ADMIN'){
          return (
            <li class="active dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                Staff
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" onClick={() =>goToListOfUsers()}>List Of Users</Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item" onClick={() => goToCreateUser()}>Add User</Link>
              </div>
            </li>
          )
      }else if(role.authority === 'USER'){
          return (
             <li class="nav-item active">
                <Link class="nav-link"  onClick={() => goToUserRequests(getUserId)}>My Requests</Link>
             </li>              
          )
      }
  })


  const goToListOfUsers= () =>{
    history.push('/users');
  }   

  const logOut=()=>{
    localStorage.clear();
    history.push('/');
  }

  const goToCreateUser=()=>{
    history.push('/create-user/');
  }

  const goToDashboard=(id)=>{
    history.push(`/dashboard/${id}`);
  }

  const viewInbox=(id)=>{
    history.push(`/view-inbox/${id}`);
  }

  const createMessage=(id)=>{
    history.push(`/create-message/${id}`);
  }

  const createRequest=(id)=>{
    history.push(`/create-request/${id}`);
  }

  const goToUserRequests=(id)=>{
    history.push(`/user-requests/${id}`);
  }

  const goToListOfRequests=()=>{
    history.push('/view-requests/');
  }


  

  return (
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
    <a class="navbar-brand" href="#">HR CRM System</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link class="nav-link" onClick={() => goToDashboard(getUserId)}>Home <span class="sr-only">(current)</span></Link>
        </li>
        
        <li class="active dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            Inbox
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link class="dropdown-item" onClick={() => viewInbox(getUserId)}>Go to Inbox</Link>
            <div class="dropdown-divider"></div>
            <Link class="dropdown-item" onClick={() => createMessage(getUserId)}>Create Chat</Link>
          </div>
        </li>

        {renderButtons}

        

        <li class="nav-item active">
          <Link class="nav-link" onClick={() => logOut()}>Logout</Link>
        </li>
      </ul>

      {/* <form class="form-inline my-2 my-lg-0">
        <button class="btn btn-outline-success" type="button">Main button</button>
      </form> */}
      {/* <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> */}
    </div>
  </nav>
  );
};

export default NavBar;
