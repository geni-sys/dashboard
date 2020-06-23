import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

// "STYLES"
import "./global.css";

// "COMPONENTS"
import App from './App'
import Login from './pages/Login'


const Routes = () => (
  <BrowserRouter>
    <CookiesProvider>
      <Route component={Login} path="/" exact />
      <Route component={App} path="/home" exact />
    </CookiesProvider>
  </BrowserRouter>
)


export default Routes
