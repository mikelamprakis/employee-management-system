import React,{useState, useEffect} from 'react';
import {fetchAllUsers, fetchUserData, deleteUserById} from '../../Api/AuthService'
import NavBar from '../NavBar';

export const ListOfUsers = (props) => {

    const [userInfo,setUserInfo]=useState({});

     useEffect( ()=>{
        fetchUserData().then((res) => { 
            setUserInfo(res.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])
        

    const getAdminUserId = userInfo.userId 

    const [listOfUsers,setListOfUsers]=useState([]);

    useEffect( ()=>{
        fetchAllUsers().then((res) => { 
           setListOfUsers(res.data);
       }).catch((e)=>{
           localStorage.clear();
           props.history.push('/')
       })
   },[])
       

   const editUser = (id) => {
        props.history.push(`/update-employee/${id}`);
   }

   const deleteUser = (id) => {
        deleteUserById(id).then(() => {
           fetchAllUsers().then((res) => { 
            setListOfUsers(res.data);
       })
    }).catch((e)=>{
           localStorage.clear();
           props.history.push('/')
       })
   }

   const viewUser = (id) => {
        props.history.push(`/${getAdminUserId}/view-employee/${id}`);
   }
   
    return (
        <div>
            <NavBar />
        <div className="container">
            <div className="row"> 
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Username</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listOfUsers.map(
                                user =>
                                <tr key ={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.firstName}</td> 
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td> 
                                    <td>
                                        <button style={{marginLeft:"10px"}} onClick={ () => viewUser(user.id)} className="btn btn-info">View </button>
                                        <button style={{marginLeft:"10px"}} onClick={ () => editUser(user.id)} className="btn btn-info">Edit </button>
                                        <button style={{marginLeft:"10px"}} onClick={ () => deleteUser(user.id)} className="btn btn-info">Delete </button>
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
