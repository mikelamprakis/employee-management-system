import './App.css';
import './sidebars.css';
import './features.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import  LoginPage from './Pages/LoginPage';
import  {Dashboard} from './Pages/Dashboard';
import  {CreateUser} from './Pages/User/CreateUser';
import  {ListOfUsers} from './Pages/User/ListOfUsers';
import  {ViewUser} from './Pages/User/ViewUser';
import  {UpdateUser} from './Pages/User/UpdateUser';
import { ViewInbox } from './Pages/ViewInbox';
import { CreateMessage } from './Pages/Message/CreateMessage';
import { ViewMessages } from './Pages/Message/ViewMessages';
import { CreateRequest } from './Pages/Request/CreateRequest';
import { ListOfRequests } from './Pages/Request/ListOfRequests';
import { ViewUserRequests } from './Pages/Request/ViewUserRequests';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/dashboard/:id" component={Dashboard}/>
        <Route exact path="/create-user" component={CreateUser}/>
        <Route exact path="/users" component={ListOfUsers}/>
        <Route exact path="/:getAdminUserId/view-employee/:id" component={ViewUser}/>
        <Route exact path="/update-employee/:id" component={UpdateUser}/>
        <Route exact path="/view-inbox/:id" component={ViewInbox}/>
        <Route exact path="/view-messages/:id" component={ViewMessages}/>
        <Route exact path="/create-message/:id" component={CreateMessage}/>  
        <Route exact path="/create-request/:id" component={CreateRequest}/>
        <Route exact path="/view-requests/" component={ListOfRequests}/>
        <Route exact path="/user-requests/:id" component={ViewUserRequests}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;