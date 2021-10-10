/* homepage blurb component */

import React from 'react';

const HomepageBlurb = ({ image, header, blurb }) => {
    return <div className="card mt-5">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
            <p className="blurb-title d-flex justify-content-center">{header}</p>
            <p className="card-text">{blurb}</p>
        </div>
    </div>
}

export default HomepageBlurb;