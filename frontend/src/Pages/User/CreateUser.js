import React, {useState} from 'react';
import {saveNewUser} from '../../Api/AuthService'
import {useHistory} from "react-router-dom";
import NavBar from '../NavBar';

export const CreateUser = () => {

    const [user, setUser] = useState({
        userName : '',
        password : '',
        firstName : '',
        lastName : '',
        email : '',
        phoneNumber : ''
    }) 

    const handleChange = (e) => {
        e.persist();
        setUser(user => ({ ...user, [e.target.name] : e.target.value }) )
    }

    let history = useHistory();  


   const createNewUser =(e) => {
        e.preventDefault();
        let newUser = {userName: user.userName, password: user.password, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber};
        console.log('employee =>'  + JSON.stringify(newUser));
        saveNewUser(newUser).then(res =>{
            history.push('/users');
        }).catch((error) => {
            console.log("Error : " ,error.response)
            if (error && error.response.status){
                switch (error.response.status){
                    case 401 :
                        console.log("401 HTTP STATUS")   
                        break;
                    default :
                        console.log('Something went wrong... Error  : ' + error.response.data.error)
                        console.log('Something went wrong. Status : ' + error.response.status + ' Trace : ' + error.response.data.trace )
                }
            }else{
                console.log("Error is ---->", error)
            }
        })
    }

    return (

        <div>
            <NavBar />
        
            <div className = 'container'>

            <br/>

                <form className="my-login-validation" onSubmit={createNewUser} > 
                    <div class="row">
                    <div className="col">
                        <label htmlFor="email">User Name</label>
                        <input id="username" type="text" className="form-control" minLength={5} value={user.userName} name="userName" required onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="col">
                        <label>Password </label>
                        <input id="password" type="password" className="form-control" minLength={4} value={user.password} name="password" required onChange={handleChange} placeholder="Password"/>
                    </div>
                    </div>

                    <br/>

                    <div class="row">
                    <div className="col">
                        <label htmlFor="email">First Name</label>
                        <input id="firstname" type="text" className="form-control" value={user.firstName} name="firstName" required onChange={handleChange} placeholder="First Name" />
                    </div>
                    
                    <div className="col">
                        <label>Last Name </label>
                        <input id="lastName" type="text" className="form-control" value={user.lastName} name="lastName" required onChange={handleChange} placeholder="Last Name"/>
                    </div>
                    </div>

                    <br/>

                    <div class="row">
                    <div className="col">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" className="form-control" value={user.email} name="email" required onChange={handleChange} placeholder="Email"/>
                    </div>
                        
                    <div className="col">
                        <label>Phone Number </label>
                        <input id="phoneNumber" type="text" className="form-control" value={user.phoneNumber} name="phoneNumber" required onChange={handleChange} placeholder="Pnone number"/>
                    </div>
                    </div>

                    <br/>

                        
                    <div className="form-group m-0">
                        <button type="submit" className="btn btn-primary"> Submit </button>
                    </div>    

                </form>

            </div>
        </div>
    );






}