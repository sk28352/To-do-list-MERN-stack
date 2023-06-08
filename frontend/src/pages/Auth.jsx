import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../components/Layout';
import Login from '../components/auth/login';
import Register from '../components/auth/Register';
import classes from './Auth.module.scss';
import useAuth from '../hooks/useAuth'

function Auth() {
  const {auth} = useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    if(auth){
      navigate('/');
    }
  },[auth,navigate]);
  return (<Layout>
    <div className={classes.form_container}>
      <Login/>
      <Register/>
    </div>

  </Layout>
    
  );
}

export default Auth;