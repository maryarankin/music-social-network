import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Stars = ({ popularity }) => {
    popularity = Math.floor(popularity / 20);
    let starPopularity = [];

    //set array for which stars will be filled in based on popularity
    for (let i = 0; i < popularity; i++) {
        starPopularity.push(true);
    }
    for (let i = 0; i < 5 - popularity; i++) {
        starPopularity.push(false);
    }

    return <div className="d-inline">
        {starPopularity.map((star, index) => {
            return <div className="d-inline">
                {star && <FontAwesomeIcon key={index} className="star-icon" icon={faStar} />}
                {!star && <FontAwesomeIcon key={index} className="star-icon" icon={farStar} />}
            </div>
        })}
    </div>
}

export default Stars;