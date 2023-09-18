import React from 'react';
import loaderGIF from '../../assets/loader.gif';
import './Loader.css';


const LoaderEl = () => {
    return(
        <div className='loadingParent'>
            <img src={loaderGIF} alt="loading..." />
        </div>
    )
}

export default LoaderEl;