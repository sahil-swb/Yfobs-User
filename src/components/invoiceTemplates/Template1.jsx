import React from 'react';
import yfobsLogo from '../../assets/images/official-yfobs-logo.png';
import { useSelector } from 'react-redux';

const Template1 = React.forwardRef((props, ref) => {
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);

    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style
                dangerouslySetInnerHTML={{
                    __html: '\n            * {\n                margin: 0;\n            }\n        '
                }}
            />
            <div ref={ref} style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#555', margin: 0, padding: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '100%',
                            boxShadow: '0 2px 15px rgba(77, 101, 117, 0.35)',
                            borderRadius: 10,
                            padding: '2rem',
                            background: '#fff'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <img src={yfobsLogo} alt="yfobs-logo" width="100%" />
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <h2 style={{ textTransform: 'uppercase' }}>{getSingleEstimate?.data?.title}</h2>
                                <p style={{ margin: '1.5rem 0' }}>{getSingleEstimate?.data?.summary}</p>
                                <p style={{ marginBottom: '1rem', lineHeight: '1.5rem' }}>
                                    <strong>SilverWebbuzz.</strong> <br />
                                    Lorem, ipsum dolor.
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div style={{ minHeight: 150 }}>
                            <div style={{ position: 'relative', margin: '2rem 0' }}>
                                <div style={{ maxWidth: '30%', position: 'absolute', left: 0 }}>
                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <b>Bill to</b>
                                        <br />
                                    </p>
                                    <p>
                                        <b>Lesley Greene</b>
                                        <br />
                                    </p>
                                    <p style={{ margin: '0.4rem 0' }}>
                                        Address: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt magni laudantium magnam vel
                                        eos dicta qui aliquam labore deleniti quidem.
                                    </p>
                                    <strong>GST No:</strong> Lorem, ipsum dolor.
                                </div>
                                <div style={{ maxWidth: '30%', position: 'absolute', right: 0 }}>
                                    <p>
                                        {props.type === 'Estimate' ? 'Estimate' : 'Invoice'} Number : {getSingleEstimate?.data?.number}
                                    </p>
                                    <p>
                                        {props.type === 'Estimate' ? 'Estimate' : 'Invoice'} date : {getSingleEstimate?.data?.date}
                                    </p>
                                    <p>
                                        {props.type === 'Estimate' ? 'Expires On' : 'Due Date'}: {getSingleEstimate?.data?.expireOn}
                                    </p>
                                    {props.type === 'Estimate' ? '' : <p style={{ marginTop: 10 }}>Within 45 Days</p>}
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: '50px 0' }}>
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    textAlign: 'center',
                                    marginBottom: 30
                                }}
                            >
                                <tbody>
                                    <tr
                                        style={{
                                            background: '#e7d8e8',
                                            height: '3rem',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    >
                                        <th>Items</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                    </tr>
                                    {getSingleEstimate?.products?.map((product) => {
                                        product?.product?.map((val, index) => {
                                            console.log('val', val);
                                            return (
                                                <tr key={index} style={{ height: '3rem', borderBottom: '1px solid #eee' }}>
                                                    <td>{val?.name}</td>
                                                    <td>{val?.price}</td>
                                                    <td>{val?.quantity}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '1rem' }}>
                                                        ₹{' '}
                                                        {(parseInt(getSingleEstimate?.data?.subTotal) / parseInt(product?.price)) *
                                                            parseInt(product?.price)}
                                                        .00
                                                    </td>
                                                    {console.log(parseInt('1') + parseInt('2'))}
                                                </tr>
                                            );
                                        });
                                    })}
                                </tbody>
                            </table>
                            <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'end', paddingRight: '1rem' }}>
                                <ul style={{ listStyle: 'none', lineHeight: 2, wordSpacing: '0.5rem' }}>
                                    <li>
                                        <b>Sub Total: </b>
                                    </li>
                                    <li>
                                        <b>Discount [10%]: </b>
                                    </li>
                                    <li>
                                        <b>CGST2.5 [2.5%]: </b>
                                    </li>
                                    <li>
                                        <b>IGST2.5 [2.5%]: </b>
                                    </li>
                                    <li>&nbsp;</li>
                                    <li>
                                        <b>Grand Total: </b>
                                    </li>
                                </ul>
                                <ul style={{ listStyle: 'none', lineHeight: 2, wordSpacing: '0.5rem' }}>
                                    <li>
                                        <b> ₹ {getSingleEstimate?.data?.subTotal}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {getSingleEstimate?.data?.discount}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {getSingleEstimate?.data?.tax}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {getSingleEstimate?.data?.tax}.00</b>
                                    </li>
                                    <li>
                                        <b>
                                            <hr />
                                        </b>
                                    </li>
                                    <li>
                                        <b> ₹ {getSingleEstimate?.data?.grandTotal}.00</b>
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
        </>
    );
});

export default Template1;
