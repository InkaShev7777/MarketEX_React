import './Authorize.css'
import axios, { Axios } from 'axios';
function Registration() {
    return (
        <div className='mainDiv'>
            <h1>Registration</h1>
            <input id='login' type="text" placeholder="Login" />
            <input id='pass' type="password" placeholder="Password" />
            <input id='passConfirm' type="password" placeholder="Confirm Password" />
            <input id='mail' type="mail" placeholder="Email" />
            <button onClick={() => {
                if (document.getElementById('pass').value === document.getElementById('passConfirm').value) {
                    axios({
                        method: 'post',
                        url: 'https://localhost:7031/api/Authentication/regUser',
                        data: {
                            "userName": document.getElementById('login').value,
                            "password": document.getElementById('pass').value,
                            "email": document.getElementById('mail').value
                        },
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    }).then(data => {
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
                            window.location.href = '/';

                            //
                            //  open main window. 
                            //

                            //\ ilove you Alisa
                            
                        });
                        alert('User added');
                    });
                }
                else {
                    alert('Password not Correct');
                }

            }}>Confirm</button>
        </div>
    );
}
export default Registration;