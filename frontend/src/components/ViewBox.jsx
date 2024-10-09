import React from 'react';
import PropTypes from 'prop-types';

const ViewBox = ({ title, paragraph, icon, color }) => {
    return (
        <div className={`view-box card ${color}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1 mr-3">
                        <div className="card-title mb-1">{title}</div>
                        <p className="card-text mb-0">{paragraph}</p>
                    </div>
                    <div className="view-box-icon-wrapper">
                        <div className="view-box-icon">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewBox.propTypes = {
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
    icon: PropTypes.element,
    color: PropTypes.string
};

ViewBox.defaultProps = {
    paragraph: '',
    color: 'bg-light'
};

export default ViewBox;