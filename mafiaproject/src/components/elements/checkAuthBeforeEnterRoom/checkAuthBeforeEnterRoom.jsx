import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { getId } from '../../../store/actions';
import ChatRoomSocketCreator from '../chatRoomSocketCreator';

const CheckAuthBeforeEnterRoom = (props) => {
    const dispatch = useDispatch(false);
    const { id } = props.match.params;
    dispatch(getId(id));
    const name = localStorage.getItem('playerName');
    const auth = '/auth';
    const toRender = name === null ? <Redirect to={auth} /> : <ChatRoomSocketCreator />;
    return toRender;
};

export default withRouter(CheckAuthBeforeEnterRoom);
