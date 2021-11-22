/* Home page */

import React from 'react';
import HomepageBlurb from '../components/HomepageBlurb';
import { homepageData } from '../data/homepageData';
import UploadPic from '../components/UploadPic';

const Home = () => {
    return <div className="container mt-5">
        <div className="title-div mx-auto">
            <h1 className="main-title text-start d-none d-xl-block">welcome to</h1>
            <h1 className="main-title text-end d-none d-xl-block">music mates</h1>

            <h1 className="main-title-small text-start d-xl-none">welcome to</h1>
            <h1 className="main-title-small text-end d-xl-none">music mates</h1>
        </div>

        <div className="container">
            <div className="row">
                {homepageData.map((data) => {
                    return <div className="col-12 col-md-4" key={data.id}>
                        <HomepageBlurb {...data} />
                    </div>
                })}
            </div>
        </div>
        <UploadPic />
    </div>
}

export default Home;