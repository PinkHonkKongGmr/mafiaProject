import React from 'react';
import './loading.scss';

const Loading = ({ text }) => (
    <div className="loader loading">
        <div className="loading_item">{text}</div>
    </div>
);

export default Loading;
