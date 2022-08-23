import React,{useState, useEffect} from 'react';
import {fetchChatByChatId, sendMessageToChat , fetchUserData} from '../../Api/AuthService'
import NavBar from '../NavBar';

export const ViewMessages = (props) => {

   const chatIdFromParams = props.match.params.id; 

   const [userInfo,setUserInfo]=useState({});
    
    useEffect( ()=>{
       fetchUserData().then((res) => {
           setUserInfo(res.data);
       }).catch((e)=>{ console.log(e)})
    },[])
       
    const userId = userInfo.userId 
  
    const [chatMessages,setChatMessages]=useState([]);
    
    useEffect( ()=>{
        fetchChatByChatId(chatIdFromParams).then((res) => {
            setChatMessages(res.data);
        }).catch((e)=>{ console.log(e)})
    },[])


    const [message, setMessage] = useState({
        messageContent : ''
    }) 

    const handleChange = (e) => {
        e.persist();
        setMessage(message => ({ ...message, [e.target.name] : e.target.value }) )
    }

    const sendMessage =(e) => {
        e.preventDefault();
        let newMessage = {messageContent: message.messageContent};
            sendMessageToChat(userId, chatIdFromParams, newMessage).then(res =>{
                window.location.reload(true);
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
                    console.log("Error : ", error)
                }
            })
    }
        
    return (
        <div>
            <NavBar />
        <div className="container">
            <h1>Chat Id : {chatIdFromParams} | Messages</h1>
            <div className="row"> 
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Msg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chatMessages.map(
                                (msginfo) =>
                                <tr key ={msginfo.id}>
                                    <td>{msginfo.userId} | {msginfo.timestamp} | {msginfo.username} | {msginfo.message}</td>
                                </tr>
                            )                          
                        }
                    </tbody>
                </table>

                
            </div>
            <form className="my-login-validation" onSubmit={sendMessage} > 
                <div className="form-group">
                    <label >Message</label>
                    <textarea class="form-control" id="username" type="text" className="form-control"  value={message.messageContent} name="messageContent" required onChange={handleChange} />
                </div>
                                            
                <div className="form-group m-0">
                    <button type="submit" className="btn btn-primary"> Submit </button>
                </div>          
            </form>
        </div>


        </div>
    )

}