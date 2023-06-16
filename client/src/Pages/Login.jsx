import '../App.scss';
import logo from '../Utils/logo.PNG'
import { Link } from 'react-router-dom';

function Login({keycloak}) {
    const handleLogin = () => {
        keycloak.login();
    }
    return (
    <div className="Home">
        <div className="home-left">
            <div className="home-left-div">
                <div className="home-left-logo-div">
                    <img src={logo} alt="logo" />
                    <b>Wordle</b>
                </div>
                <h1>Login to your account</h1>
                <div className="home-left-form-div">
                    <hr />
                    <button onClick={handleLogin}>
                        Sign in
                    </button>
                    <div className="register-p-div">
                        <p className="register-p">New here?</p>
                        <p className="register-p">Register to play!</p>
                    </div>
                    <button className="register-btn">
                        <Link className="link" to="/register">Sign up</Link>
                    </button>
                </div>
            </div>
        </div>
        <div className="home-right">
            <div className="home-right-div">
                <b>New here? </b>
                <b>Register to play!</b>
                <p>Register now, solve your wordles and be better than everyone!</p>
            </div>
        </div>
    </div>
    );
}

export default Login;
