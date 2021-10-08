import React from 'react';

const Register = () => {
    return <div className="container mt-5 d-flex justify-content-center">
        <div className="card" style={{ width: '35rem' }}>
            <img src="https://images.unsplash.com/photo-1520483691742-bada60a1edd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" className="card-img-top" alt="listening to music" />
            <div className="card-body">
                <h5 class="card-title mb-4">Register</h5>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-4">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn buttons">Submit</button>
                </form>
            </div>
        </div>
    </div>
}

export default Register;
