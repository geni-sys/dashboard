import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// "STYLES"
import "./global.css";

// "COMPONENTS"
import App from './App'
import Login from './pages/Login'


const Routes = () => (
  <BrowserRouter>
    <Route component={Login} path="/" exact />
    <Route component={App} path="/home" exact />
  </BrowserRouter>
)


export default Routes
