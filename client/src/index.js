import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ImageProvider } from "./context/ImageContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";//라우팅 처리를 가능하게 해줌, browserRouter 컴포넌트에서 현재 페이지의 상태값을 관리




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ImageProvider>
          <App />
        </ImageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
