import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';

const OpenModalButton = ({ buttonName, modalType }) => {
    const dispatch = useDispatch();
    return (
        <Button
            onClick={() => {
                dispatch(commonModalIsOpen(true));
                dispatch(commonModalType(modalType));
            }}
            variant="outline-primary"
        >
            {buttonName}
        </Button>
    );
};

export default OpenModalButton;
