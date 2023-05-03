import React from 'react';

const CommonSelect = ({ getAllData, defaultSelectText, handleChange, type, countryPrefillValue }) => {
    return (
        <>
            <select className="form-control mb-3 border rounded" onChange={(e) => handleChange(e)}>
                <option value="">{defaultSelectText}</option>
                {getAllData.map((val) => (
                    <option key={val?._id} value={type === 'CUSTOMERS' ? val._id : type === 'COUNTRIES' ? val?.countryName : null}>
                        {type === 'CUSTOMERS' || type === 'STATES' ? val?.name : type === 'COUNTRIES' ? countryPrefillValue : null}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CommonSelect;
