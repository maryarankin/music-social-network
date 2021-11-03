import React from 'react';

const NoSearchResults = () => {
    return <div className="container d-flex justify-content-center mt-5">
        <div className="card border-danger mb-3 text-center" style={{ width: '30rem' }}>
            <div class="card-header">No Results</div>
            <div className="card-body text-danger">
                <p className="card-text">Your query returned no results. Try again.</p>
            </div>
        </div>
    </div>
}

export default NoSearchResults;