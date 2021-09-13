/* Home page */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return <div className="container mt-5">
        <div className="title-div mx-auto">
            <h1 className="main-title d-flex justify-content-start">welcome to</h1>
            <h1 className="main-title d-flex justify-content-end">music mates</h1>
        </div>

        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mt-5">
                        <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="blurb-title d-flex justify-content-center">put your tastes on display</p>
                            <p className="card-text">Create your own profile page to show off your favorite artists and songs.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card mt-5">
                        <img src="https://images.unsplash.com/photo-1511148672734-98014884c11e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="blurb-title d-flex justify-content-center">share with your friends</p>
                            <p className="card-text">Compare your tastes to your friends' and give them recommendations for what you know they'll love.</p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card mt-5">
                        <img src="https://images.unsplash.com/photo-1521931961826-fe48677230a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="blurb-title d-flex justify-content-center">connect with other fans</p>
                            <p className="card-text">Meet people who like the same things as you and discuss your favorite music with them.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 d-flex justify-content-center">
                <Link to="/" type="button" className="btn buttons mx-3">Login</Link>
                <Link to="/" type="button" className="btn buttons mx-3">Register</Link>
            </div>
        </div>
    </div>
}

export default Home;