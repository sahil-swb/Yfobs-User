import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinessesApi } from '../slices/settingsSlice';

const ActiveBusinessId = () => {
    const { getAllBusinessesData } = useSelector((state) => state.settingsReducer);
    const [singleBusinessId, setSingleBusinessId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBusinessesApi());
    }, []);

    getAllBusinessesData.filter((val) => {
        if (val?.isActive === 1) {
            return val?._id;
        }
    });
};

export default ActiveBusinessId;
