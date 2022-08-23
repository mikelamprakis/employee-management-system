import React,{useState, useEffect} from 'react';
import {fetchRequestsByUserId} from '../../Api/AuthService'
import NavBar from '../NavBar';

export const ViewUserRequests = (props) => {

    const userIdFromParams = props.match.params.id;

    const [lisOfUserRequests,setLisOfUserRequests]=useState([]);

     useEffect( ()=>{
        fetchRequestsByUserId(userIdFromParams).then((res) => { 
            setLisOfUserRequests(res.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])

    return (

        <div>
            <NavBar />

        <div className="container">
            <div className="row"> 
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lisOfUserRequests.map( request => 
                              <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.fromDate}</td>
                                <td>{request.toDate}</td>
                                <td>{request.status}</td>
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
