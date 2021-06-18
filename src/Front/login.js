import { Link } from 'react-router-dom'

const Login = () => {
    return(
        <div className="signPart">
            <div className="signCart">
                <h1>Sign In</h1>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@gmail.com"></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="***********"></input>
                </div>
                <div className="form-group formSet">
                    <input type="submit" className="form-control btn btn-sm button_class" value="SIGN IN"></input>
                </div>
                <div className="signData">
                   Not a member .<Link to="/signup" >Create a new account </Link>
                </div>
            </div>
        </div>
    )
}

export default Login