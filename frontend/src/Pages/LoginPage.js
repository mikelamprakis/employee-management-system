import React,{useState} from 'react';
import {userLogin, fetchUserData} from '../Api/AuthService'
import {useHistory} from "react-router-dom";
import {Alert,Spinner} from 'react-bootstrap';


const LoginPage = (...props) => {

    const [values, setValues] = useState({
        userName : '',
        password : ''
    })

    const [errorMessage,setErrorMessge]=useState();
    const [loading,setLoading]=useState(false);  

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name] : e.target.value }) )
    }

    let history = useHistory(); 


    const handleSubmit = (e) => {
        e.preventDefault();

        userLogin(values).then((response) => {
            setLoading(true)
            if (response.status===200){
                localStorage.setItem('USER_KEY',response.data.token);
                fetchUserData().then((res) => {
                    const userInfo = res.data
                    const id  = res.data.userId
                    let authorities = '';
                    const roles = res.data.roles.map( (element) =>{
                        authorities += "auth:" + element.roleCode
                    })
                    history.push(`/dashboard/${id}`);
                })
            }
        }).catch((error) => {
            console.log("Error : " ,error.response)
            if (error && error.response.status){
                switch (error.response.status){
                    case 401 :
                        console.log("401 HTTP STATUS")
                        setErrorMessge("Invalid login Credentials")
                        break;
                    default :
                        console.log('Something went wrong... Error  : ' + error.response.data.error)
                        setErrorMessge('Something went wrong. Status : ' + error.response.status + ' Trace : ' + error.response.data.trace )
                }
            }else{
                setErrorMessge('Something went wrong')
            }
        })
    }

   
    return (
        <div className = 'container'>

        <br/>
        <br/>
        <hr/>

        <div className = 'card col-md-6 offset-md-3'>
        <br/>  
            { errorMessage && <Alert style={{marginTop:'20px'}} variant="danger"> {errorMessage} </Alert> }                   
                                          
            <form className="my-login-validation"  noValidate={false} onSubmit={handleSubmit} > 
                 <div className="form-group">
                     <label htmlFor="email">User Name</label>
                     <input id="username" type="text" className="form-control" minLength={5} value={values.userName} name="userName" required onChange={handleChange} />
                 </div>
                
                 <div className="form-group">
                     <label>Password </label>
                     <input id="password" type="password" className="form-control" minLength={4} value={values.password} name="password" required onChange={handleChange}/>
                 </div>

                 <div className="form-group">
                     <div className="custom-control custom-checkbox">
                           <input type="checkbox" className="custom-control-input" id="customCheck1" />
                           <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                     </div>
                 </div>
                                
                 <div className="form-group m-0">
                     <button type="submit" className="btn btn-primary"> 
                     Login 
                     {loading && (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />)}
                     </button>
                 </div> 
                 <br/>         
            </form>
        </div>
        </div>
    )
}
export default LoginPage;