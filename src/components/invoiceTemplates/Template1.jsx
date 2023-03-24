import React from 'react';

const Template1 = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#555', margin: 0, padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        width: '100%',
                        boxShadow: '0 2px 15px rgba(77, 101, 117, 0.35)',
                        background: '#fff',
                        borderRadius: '10px',
                        padding: '2rem'
                    }}
                >
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ textTransform: 'uppercase' }}>Lorem ipsum dolor sit amet.</h2>
                        <p style={{ margin: '1.5rem 0' }}>Lorem, ipsum dolor.</p>
                        <p style={{ marginBottom: '1rem', lineHeight: '1.5rem' }}>
                            <strong>SilverWebbuzz.</strong> <br />
                            Lorem, ipsum dolor.
                        </p>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                        <div style={{ maxWidth: '30%' }}>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <b>Bill to</b>
                                <br />
                            </p>
                            <p>
                                <b>Lesley Greene</b>
                                <br />
                            </p>
                            <p style={{ margin: '0.4rem 0' }}>
                                Address: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt magni laudantium magnam vel eos
                                dicta qui aliquam labore deleniti quidem.
                            </p>
                            <strong>GST No:</strong> Lorem, ipsum dolor.
                        </div>
                        <div style={{ maxWidth: '30%' }}>
                            <p>Estimate Number : 3468</p>
                            <p>Estimate date : 30 Nov -0001</p>
                            <p>Expires on : 30 Nov -0001</p>
                        </div>
                    </div>
                    <div style={{ margin: '50px 0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', marginBottom: '30px' }}>
                            <tbody>
                                <tr style={{ background: '#e7d8e8', height: '3rem', borderBottom: '1px solid #eee' }}>
                                    <th>Items</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                                <tr style={{ height: '3rem', borderBottom: '1px solid #eee' }}>
                                    <td>Lorem, ipsum dolor.</td>
                                    <td>100</td>
                                    <td>2</td>
                                    <td>500</td>
                                </tr>
                                <tr style={{ height: '3rem', borderBottom: '1px solid #eee' }}>
                                    <td>Lorem, ipsum dolor.</td>
                                    <td>100</td>
                                    <td>2</td>
                                    <td>500</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'right' }}>
                            <ul style={{ listStyle: 'none', lineHeight: 2, wordSpacing: '0.5rem' }}>
                                <li>
                                    <b>Sub Total: 100</b>
                                </li>
                                <li>
                                    <b>Discount [10%]: 100</b>
                                </li>
                                <li>
                                    <b>IGST0 [0%]: 100</b>
                                </li>
                                <li>
                                    <b>Grand Total: 300</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', lineHeight: 2 }}>
                        <p>Thank You For Created By YFobs.in</p>
                        <p>This Invoice is created by YFobs</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Template1;
