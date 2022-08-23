import React, {useState} from 'react';
import {updatewUser} from '../../Api/AuthService'
import {useHistory} from "react-router-dom";
import NavBar from '../NavBar';

export const UpdateUser = (props) => {

    const [user, setUser] = useState({
        id : props.match.params.id,
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

    const updateEmployee = (e) => {
        e.preventDefault();
        let newUser = {userName: user.userName, password: user.password, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber};
        updatewUser(user.id, newUser).then( res => {
            history.push('/users');
        });
    }
    
    return (

        <div>
        <NavBar />

        <div className = 'container'>  
            <form className="my-login-validation" onSubmit={updateEmployee} > 

                 <div class="row">
                    <div className="col">
                        <label htmlFor="email">User Name</label>
                        <input id="username" type="text" className="form-control"  value={user.userName} name="userName"  onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="col">
                        <label>Password </label>
                        <input id="password" type="password" className="form-control"  value={user.password} name="password"  onChange={handleChange} placeholder="Password"/>
                    </div>
                    </div>

                    <br/>

                    <div class="row">
                    <div className="col">
                        <label htmlFor="email">First Name</label>
                        <input id="firstname" type="text" className="form-control" value={user.firstName} name="firstName"  onChange={handleChange} placeholder="First Name" />
                    </div>
                    
                    <div className="col">
                        <label>Last Name </label>
                        <input id="lastName" type="text" className="form-control" value={user.lastName} name="lastName"  onChange={handleChange} placeholder="Last Name"/>
                    </div>
                    </div>

                    <br/>

                    <div class="row">
                    <div className="col">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" className="form-control" value={user.email} name="email"  onChange={handleChange} placeholder="Email"/>
                    </div>
                        
                    <div className="col">
                        <label>Phone Number </label>
                        <input id="phoneNumber" type="text" className="form-control" value={user.phoneNumber} name="phoneNumber"  onChange={handleChange} placeholder="Pnone number"/>
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