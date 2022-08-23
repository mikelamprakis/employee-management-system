import React, {useState, useEffect} from 'react';
import {saveNewRequest} from '../../Api/AuthService'
import NavBar from '../NavBar';

export const CreateRequest = (props) => {

    const userIdFromParams = props.match.params.id; 

    const [dates, setDates] = useState({
        fromDate : new Date(),
        toDate : new Date()
    }) 

    const handleChange = (e) => {
        e.persist();
        setDates(dates => ({ ...dates, [e.target.name] : e.target.value }) )  
    }

   const createNewRequest =(e) => {
        e.preventDefault();
        let newRequest = {fromDate: dates.fromDate, toDate: dates.toDate};
        saveNewRequest(userIdFromParams, newRequest).then(res =>{
            props.history.push(`/`);
        }).catch((error) => {
            console.log("Error : " +JSON.stringify(error))
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
                console.log("Error is : ", error)
            }
        })
    }

    return (
        <div>
            <NavBar />

            <div className = 'container'>
                <form className = 'container' onSubmit={createNewRequest} > 
                    <div class="row">   
                        <div className="col">
                            <label path="fromDate">From</label>
                        <input className="form-control" path="fromDate" type="date" onChange={handleChange} name="fromDate" value={dates.fromDate} />
                        </div>
                
                        <div className="col">
                            <label path="toDate">To</label>
                            <input className="form-control" path="toDate" type="date" onChange={handleChange} name="toDate" value={dates.toDate} />
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