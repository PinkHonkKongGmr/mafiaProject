import React from 'react';
import LoaderLib from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
    const typesOfLoader = [
        'Audio',
        'Ball-Triangle',
        'Bars',
        'Circles',
        'Grid',
        'Hearts',
        'Oval',
        'Puff',
        'Rings',
        'TailSpin',
        'ThreeDots',
    ];
    let type = typesOfLoader[Math.floor(Math.random() * typesOfLoader.length)];
    return (
        <div className="loader">
            <LoaderLib
                type={type}
                color="rgb(55, 175, 55)"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    );
};

export default Loader;
