import React, {useState, useEffect} from 'react';
import {fetchAllUsers, initiateChatWithMessage} from '../../Api/AuthService'
import {useHistory} from "react-router-dom";
import NavBar from '../NavBar';



export const CreateMessage = (props) => {

    const userIdFromParams = props.match.params.id; 

    const [message, setMessage] = useState({
        messageContent : ''
    }) 

    const [receivers, setReceivers] = useState({
        receiversList : []
    }) 

    const handleChange = (e) => {
        e.persist();
        setMessage(message => ({ ...message, [e.target.name] : e.target.value }) )
    }

    const handleMultiChange = (event) => {
        event.persist();
        let value = Array.from(
          event.target.selectedOptions,
          (option) => option.value
        );
        setReceivers({
            receiversList: value,
        });
      }

    let history = useHistory();  

   const createNewMessage =(e) => {
        e.preventDefault();
        let newMessage = {messageContent: message.messageContent, receivers: receivers.receiversList.map( user => JSON.parse(user).id )};
        initiateChatWithMessage(userIdFromParams, newMessage).then(res =>{
            history.push(`/view-inbox/${userIdFromParams}`);
        }).catch((error) => {
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

    const [listOfUsers,setListOfUsers]=useState([]);

    useEffect( ()=>{
        fetchAllUsers().then((res) => { 
           setListOfUsers(res.data);
       }).catch((e)=>{
           localStorage.clear();
           props.history.push('/')
       })
    },[])
    
    return (
        <div>
        <NavBar />
        <div className = 'container'>
            <form className="my-login-validation" onSubmit={createNewMessage} > 
                 
                
                 <div className="form-group">
                    <label>Receivers</label>
                    <select multiple={true} className="form-control" value={receivers.receiversList} name="contributorsList" onChange={handleMultiChange} multi>
                    {listOfUsers.map(user => (
                        <option key={user.id} value={JSON.stringify(user)}>
                            {user.userName}
                        </option>
                    ))}
                    </select>
                 </div>   

                 <div className="form-group">
                     <label htmlFor="email">Message</label>
                     <textarea class="form-control" id="username" type="text" className="form-control"  value={message.messageContent} name="messageContent" required onChange={handleChange} />
                 </div>
    
                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> Submit </button>
                 </div>          
            </form>
        </div>
        </div>
    );

}