import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    // const [authenticated, setauthenticated] = useState('');
    // const loggedInUser = localStorage.getItem('authToken');
    // useEffect(() => {
    //     if (loggedInUser) {
    //         setauthenticated(loggedInUser);
    //     }
    // }, [loggedInUser]);
    // if (!authenticated) {
    //     return <div>Hello Dashboard</div>;
    // } else {
    //     return <Redirect to="/" />;
    // }
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
};

export default Dashboard;
