import axios, { Axios } from 'axios';
import './Authorize.css';
function Authoriz(){
    return(
        <div className='mainDiv'>
            <h1>Authorization</h1>
            <input id='login' type="text" placeholder="Login" />
            <input id='pass' style={{ margin: '0px' }} type="password" placeholder="Password" />
            <button onClick={() => {
                axios({
                    method: 'post',
                    url: 'https://localhost:7031/api/Authentication/Login',
                    data: {
                        "userName": document.getElementById('login').value,
                        "password": document.getElementById('pass').value
                    },
                    dataType: "dataType",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }).then(data => {
                    sessionStorage.setItem('token', data['data']['token']);
                    sessionStorage.setItem('iduser', data['data']['id']);
                    window.location.href='/';
                });
            }}>Confirm</button>
            <a id='signUpLink' href="/registration">Sign Up</a>
        </div>
    );
}
export default Authoriz;