/* not using this page anymore */

import React from 'react';
import LoginButton from '../../components/LoginButton';

const Login = () => {
    return <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ width: '35rem' }}>
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" className="card-img-top" alt="DJ" />
            <div className="card-body">
                <h5 class="card-title mb-4">Login</h5>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-4">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <LoginButton className="btn buttons" />
                </form>
            </div>
        </div>
    </div>
}

export default Login;