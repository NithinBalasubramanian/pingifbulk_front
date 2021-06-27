import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {


    let history = useHistory();
    
    let initialState = {
        'email' : '',
        'password' : '',
    } 

    let [ data , setData ] = useState(initialState);

    const changeState = (e) => {
        setData(prevstate => { 
            return {...prevstate , [e.target.name] : e.target.value }
        });
    }

    const login = (e) => {

        e.preventDefault();

        const datapayload = {
            'email' : data.email,
            'password' : data.password
        }

        axios.post('http://pingifbulk.infonixmedia.in/Api/login/users',datapayload,{
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(res=>{
            setData(initialState);
            if(res.data === 1){
                history.push("/Dashboard");
            }else{
                alert('Password not match');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className="signPart">
            <div className="signCart">
                <h1>Sign In</h1>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={ data.email } onChange={ changeState } placeholder="example@gmail.com"></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="***********" value={ data.password } onChange={ changeState } ></input>
                </div>
                <div className="form-group formSet">
                    <input type="submit" onClick={ login } className="form-control btn btn-sm button_class" value="SIGN IN"></input>
                </div>
                <div className="signData">
                   Not a member .<Link to="/signup" >Create a new account </Link>
                </div>
            </div>
        </div>
    )
}

export default Login