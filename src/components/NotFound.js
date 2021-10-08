import React from 'react';

const NotFound = () => {
    return <div className="container d-flex justify-content-center mt-5">
        <div className="card border-danger mb-3 text-center" style={{ width: '30rem' }}>
            <div class="card-header">Error</div>
            <div className="card-body text-danger">
                <p className="card-text">Page not found</p>
            </div>
        </div>
    </div>
}

export default NotFound;