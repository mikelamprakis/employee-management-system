import React,{useState, useEffect} from 'react';
import {fetchUserById} from '../../Api/AuthService'

export const ViewUser = (props) => {

    const [user,setUser]=useState({
        id : props.match.params.id,
        userDetails : {}
    });
    
    useEffect( ()=>{
        fetchUserById(props.match.params.id).then((res) => {
            setUser({userDetails : res.data});
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])

    const listOfAuthorities = user.userDetails.authorities ?? []

    const renderAuthorities = listOfAuthorities.map( (authority) => {
        const roleId = authority.id
        const roleCode = authority.roleCode
        const roleDescription = authority.roleDescription
        const userAuthority = authority.authority
        return (
            <div className='container'>

                <div className = "row">
                        <div className="col-sm">
                            <label> Role ID : </label>
                        </div>
                        <div className="col-sm">
                            <div>{roleId}</div>
                        </div>
                </div>
                
                <div className = "row">
                        <div className="col-sm">
                            <label> Role Code : </label>
                        </div>
                        <div className="col-sm">
                            <div>{roleCode}</div>
                        </div>
                </div>

                <div className = "row">
                        <div className="col-sm">
                            <label> Role Description : </label>
                        </div>
                        <div className="col-sm">
                            <div>{roleDescription}</div>
                        </div>
                </div>

                <div className = "row">
                        <div className="col-sm">
                            <label> Authority : </label>
                        </div>
                        <div className="col-sm">
                            <div>{userAuthority}</div>
                        </div>
                </div>
                
           </div>
            )
    })

    return (
        <div>
            <br></br>
            <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> View User Details</h3>
                <div className = "card-body">

                    <div className = "row">
                        <div className="col-sm">
                            <label> First Name: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.firstName }</div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Last Name: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.lastName }</div>
                        </div>
                    </div>

                    <div className = "row">
                        <div className="col-sm">
                            <label> Email: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.email }</div>
                        </div>
                    </div>

                    <div className = "row">
                        <div className="col-sm">
                            <label> Phonenumber: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.phoneNumber }</div>
                        </div>
                    </div>
                    
                    <div className = "row">
                        <div className="col-sm">
                            <label> Username: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.userName }</div>
                        </div>
                    </div>

                    <div className = "row">
                        <div className="col-sm">
                            <label> Password: </label>
                        </div>
                        <div className="col-sm">
                            <div> { user.userDetails.password }</div>
                        </div>
                    </div>

                    <br/>

                    <div className = "row">
                       <label> Authorities </label>
                    </div>
                    <div className = "row">
                        <div>{renderAuthorities}</div>
                    </div>

                </div>
            </div>
        </div>
    )
}