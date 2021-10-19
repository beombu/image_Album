import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import { Switch,Route } from "react-router-dom";//Route : path값에 따라 어떤 component를 렌더링할지 결정
import ToolBar from "./components/ToolBar";
import ImagePage from "./pages/ImagePage"

const App = () => {

  return (
    <div style={{ maxWidth:600, margin: "auto"}}>
      <ToastContainer />
      <ToolBar />
      <Switch>
        <Route path="/images/:imageId" exact component={ImagePage}/>
        <Route path= "/" exact component = { MainPage} />
        <Route path= "/auth/register" exact component = { RegisterPage} />
        <Route path= "/auth/login" exact component = { LoginPage} />
      </Switch>
    </div>
    
  );
}

export default App;
