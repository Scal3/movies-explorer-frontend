import './Preloader.css'

import React from 'react'
import { useSelector } from 'react-redux';

import { getIsLoadValue } from '../../selectors/selectors';

const Preloader = () => {

    const isLoad = useSelector(getIsLoadValue)

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
