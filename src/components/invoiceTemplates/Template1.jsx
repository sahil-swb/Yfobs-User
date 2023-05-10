import React from 'react';
import yfobsLogo from '../../assets/images/official-yfobs-logo.png';

const Template1 = React.forwardRef((props, ref) => {
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
                                <h2 style={{ textTransform: 'uppercase' }}>{props.getSingleEstimate?.data?.title}</h2>
                                <p style={{ margin: '1.5rem 0' }}>{props.getSingleEstimate?.data?.summary}</p>
                                <div style={{ marginBottom: '1rem', lineHeight: '1.5rem' }}>
                                    <strong>{props.estimateBusinessData?.businessName}</strong> <br />
                                    <p>
                                        {props.estimateBusinessData?.address}, {props.estimateBusinessData?.city}
                                        <br />
                                        {props.estimateBusinessData?.stateId}
                                        <br />
                                        {props.estimateBusinessData?.vatCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div style={{ minHeight: 150 }}>
                            <div style={{ position: 'relative', margin: '2rem 0' }}>
                                <div style={{ maxWidth: '30%', position: 'absolute', left: 0 }}>
                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <b>Bill to</b>
                                    </p>
                                    <p>
                                        <b>{props.estimateCustomerData?.name}</b>
                                    </p>
                                    <div style={{ margin: '0.4rem 0' }}>
                                        <b>Address:</b>{' '}
                                        <div>
                                            <span>
                                                {props.estimateCustomerData?.address}, {props.estimateCustomerData?.city}
                                            </span>
                                            <br />
                                            <span>
                                                {props.estimateCustomerData?.state}, {props.estimateCustomerData?.countryName}
                                            </span>
                                            <br />
                                            <span>{props.estimateCustomerData?.phone}</span>
                                            <br />
                                        </div>
                                    </div>
                                    <strong>GST No:</strong> {props.estimateCustomerData?.vatCode}
                                </div>

                                <div style={{ maxWidth: '30%', position: 'absolute', right: 0 }}>
                                    <p>
                                        {props.type === 'Estimate' ? 'Estimate' : 'Invoice'} Number :{' '}
                                        {props.getSingleEstimate?.data?.number}
                                    </p>
                                    <p>
                                        {props.type === 'Estimate' ? 'Estimate' : 'Invoice'} date : {props.getSingleEstimate?.data?.date}
                                    </p>
                                    <p>
                                        {props.type === 'Estimate' ? 'Expires On' : 'Due Date'}: {props.getSingleEstimate?.data?.expireOn}
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
                                            background: props.estimateBusinessData?.color ? props.estimateBusinessData?.color : '#e7d8e8',
                                            height: '3rem',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    >
                                        <th>Items</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                    </tr>
                                    {props.getSingleEstimate?.products?.map((val) =>
                                        val.product?.map((product, index) => {
                                            return (
                                                <tr key={index} style={{ height: '3rem', borderBottom: '1px solid #eee' }}>
                                                    <td>{product?.name}</td>
                                                    <td>{product?.price}</td>
                                                    <td>{product?.quantity}</td>
                                                    <td style={{ textAlign: 'end', paddingRight: '1rem' }}>
                                                        ₹ {product?.price * product?.quantity}.00
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                            <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'end', paddingRight: '1rem' }}>
                                <ul style={{ listStyle: 'none', lineHeight: 2, wordSpacing: '0.5rem' }}>
                                    <li>
                                        <b>Sub Total: </b>
                                    </li>
                                    <li>
                                        <b>Discount [{props.getSingleEstimate?.data?.discount}%]: </b>
                                    </li>
                                    <li>
                                        <b>CGST2.5 [{props.getSingleEstimate?.data?.tax / 2}%]: </b>
                                    </li>
                                    <li>
                                        <b>SGST2.5 [{props.getSingleEstimate?.data?.tax / 2}%]: </b>
                                    </li>
                                    <li>&nbsp;</li>
                                    <li>
                                        <b>Grand Total: </b>
                                    </li>
                                </ul>
                                <ul style={{ listStyle: 'none', lineHeight: 2, wordSpacing: '0.5rem' }}>
                                    <li>
                                        <b> ₹ {props.getSingleEstimate?.data?.subTotal}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {props.discountAmount}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {props.taxValue / 2}.00</b>
                                    </li>
                                    <li>
                                        <b> ₹ {props.taxValue / 2}.00</b>
                                    </li>
                                    <li>
                                        <b>
                                            <hr />
                                        </b>
                                    </li>
                                    <li>
                                        <b> ₹ {Math.round(props.getSingleEstimate?.data?.grandTotal)}.00</b>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', lineHeight: 2 }}>
                            <p>This is an electronically generated document, no signature is required.</p>
                            <p>This Invoice is created by YFobs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Template1;
