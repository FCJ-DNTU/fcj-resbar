import React from 'react';
import { Link } from 'react-router-dom';

const SmallBox = ({ number, paragraph, link, color, icon }) => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className={`card bg-${color} text-white h-100`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="display-4 font-weight-bold">{number}</h3>
                            <p className="mb-0">{paragraph}</p>
                        </div>
                        <div className="icon">
                            <i className={`${icon} fa-3x opacity-50`} />
                        </div>
                    </div>
                </div>
                <Link to={`/${link}`} className="card-footer bg-transparent border-top-0 text-white">
                    More info <i className="fas fa-arrow-circle-right ml-1" />
                </Link>
            </div>
        </div>
    );
}

export default SmallBox;