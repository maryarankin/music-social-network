/* Home page */

import React from 'react';
import { Link } from 'react-router-dom';
import HomepageBlurb from '../components/HomepageBlurb';
import { homepageData } from '../data/homepageData';

const Home = () => {
    return <div className="container mt-5">
        <div className="title-div mx-auto">
            <h1 className="main-title d-flex justify-content-start">welcome to</h1>
            <h1 className="main-title d-flex justify-content-end">music mates</h1>
        </div>

        <div className="container">
            <div className="row">
                {homepageData.map((data) => {
                    return <div className="col" key={data.id}>
                        <HomepageBlurb {...data} />
                    </div>
                })}
            </div>

            <div className="mt-5 d-flex justify-content-center">
                <Link to="/" type="button" className="btn buttons mx-3">Login</Link>
                <Link to="/" type="button" className="btn buttons mx-3">Register</Link>
            </div>
        </div>
    </div>
}

export default Home;