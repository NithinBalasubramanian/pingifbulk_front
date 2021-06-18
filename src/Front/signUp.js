import { Link } from 'react-router-dom'

const Signup = () => {
    return(
        <div className="signPart">
            <div className="signCart">
                <h1>Sign Up</h1>
                <div className="form-group formSet">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="User Name"></input>
                </div>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@gmail.com"></input>
                </div>
                <div className="form-group formSet">
                    <label>Contact</label>
                    <input type="text" className="form-control" placeholder="Enter contact"></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="***********"></input>
                </div>
                <div className="form-group formSet">
                    <label>Re-type Password</label>
                    <input type="password" className="form-control" placeholder="***********"></input>
                </div>
                <div className="form-group formSet">
                    <input type="submit" className="form-control btn btn-sm button_class" value="SIGN UP"></input>
                </div>
                <div className="signData">
                   Already a member .<Link to="/signin" >Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup