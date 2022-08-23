import React,{useState, useEffect} from 'react';
import {fetchAllRequests, updateNewStatus, deleteUserById} from '../../Api/AuthService'
import NavBar from '../NavBar';
import ListItem from './ListItem'

export const ListOfRequests = (props) => {

    const [lisOfRequests,setLisOfRequests]=useState([]);

     useEffect( ()=>{
        fetchAllRequests().then((res) => { 
            setLisOfRequests(res.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/')
        })
    },[])

    const submitStatus = (requestId, value) => {
        let newStatus = { status: value };
        updateNewStatus(requestId, newStatus).then((res) => {
        });
    };

    const setAction = (id, value) => {
        setLisOfRequests(prevLisOfRequests => {
            const currentRow = prevLisOfRequests.find(row => row.id === id);
            currentRow.status = value;
            return [...prevLisOfRequests];
        })
        submitStatus(id, value);
    }

    return (

        <div>
            <NavBar />
            <div className="container">
                <div className="row"> 
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>User</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lisOfRequests.map( request => <ListItem request={request} onDropdownSelect={setAction} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
