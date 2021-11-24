import React from 'react'
import './Preloader.css'

const Preloader = ({isLoad}) => {

    const isLoading = isLoad ? 'preloader' : 'preloader_inactive'

    return (
        <div className={isLoading}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
