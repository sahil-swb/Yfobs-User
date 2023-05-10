import React from 'react';
import yfobsLogo from '../../assets/images/official-yfobs-logo.png';

const Template4 = React.forwardRef((props, ref) => {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style
                dangerouslySetInnerHTML={{
                    __html: '\n            * {\n                margin: 0;\n                padding: 0;\n                word-break: break-all;\n            }\n            table,\n            th,\n            td {\n                border: 1px solid grey;\n                border-collapse: collapse;\n            }\n        '
                }}
            />
            <div ref={ref} style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#555', margin: 0, padding: 0 }}>
                <div
                    style={{
                        boxShadow: '0 2px 15px rgba(77, 101, 117, 0.35)',
                        borderRadius: 10,
                        padding: '2rem',
                        background: '#fff'
                    }}
                >
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ textAlign: 'left' }}>
                                <th>
                                    <div style={{ display: 'grid' }}>
                                        <div>
                                            <h2 style={{ padding: '0.5rem 0 0 0.5rem', textTransform: 'uppercase' }}>
                                                {props.getSingleEstimate?.data?.title}
                                            </h2>
                                        </div>
                                        <div style={{ color: '#fff' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        background: props.estimateBusinessData?.color
                                                            ? props.estimateBusinessData?.color
                                                            : '#e7d8e8',
                                                        padding: '0.5rem 0 0.5rem 0.5rem',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {props.getSingleEstimate?.data?.summary}
                                                </div>
                                                <div>
                                                    <img
                                                        style={{ boxShadow: '2px 2px 15px grey' }}
                                                        src={yfobsLogo}
                                                        alt="official-yfobs-logo"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        background: props.estimateBusinessData?.color
                                                            ? props.estimateBusinessData?.color
                                                            : '#e7d8e8',
                                                        padding: '0.5rem 0.8rem'
                                                    }}
                                                >
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ padding: '0 0 0.5rem 0.5rem' }}>{props.estimateBusinessData?.address}</p>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            margin: '0.5rem 0',
                                            padding: '0 0.5rem'
                                        }}
                                    >
                                        <div style={{ fontSize: 16 }}>
                                            <b>GSTIN: {props.estimateBusinessData?.vatCode}</b>
                                        </div>
                                        <div style={{ fontSize: 16 }}>
                                            <b>Tax Invoice</b>
                                        </div>
                                        <div style={{ fontSize: 12 }}>ORIGINAL FOR RESIPIENT</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style={{ display: 'flex', fontSize: 14 }}>
                                        <table style={{ width: '70%' }}>
                                            <tbody>
                                                <tr>
                                                    <th style={{ padding: '0.3rem 0', textAlign: 'center' }}>Customer Details</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style={{ padding: '0.5rem' }}>
                                                            <ul style={{ listStyle: 'none', lineHeight: 2 }}>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>M/S: </b>
                                                                    <span>{props.getSingleEstimate?.data?.summary}</span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>Address: </b>
                                                                    <span>{props.estimateCustomerData?.address}</span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>PHONE: </b>
                                                                    <span>{props.estimateCustomerData?.phone}</span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>GSTIN: </b>
                                                                    <span>{props.estimateCustomerData?.vatCode}</span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>Place of Supply : </b>
                                                                    <span>
                                                                        {props.getSingleEstimate?.data?.customerState},{' '}
                                                                        {props.getSingleEstimate?.data?.customerCountry}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style={{ width: '30%' }}>
                                            <div style={{ padding: '0.5rem' }}>
                                                <ul style={{ listStyle: 'none', lineHeight: 2 }}>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Invoice date :</b>
                                                        <span>{props.getSingleEstimate?.data?.date}</span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Invoice no :</b>
                                                        <span>752</span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Challan no :</b>
                                                        <span>8797987898</span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>P.O./S.O. no :</b>
                                                        <span>{props.getSingleEstimate?.data?.posoNumber}</span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Due date :</b>
                                                        <span>{props.getSingleEstimate?.data?.expireOn}</span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Within :</b>
                                                        <span>60 Days</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table style={{ width: '100%', fontSize: 14 }}>
                                        <tbody>
                                            <tr style={{ height: '2rem', textAlign: 'center', background: '#f1f1f1' }}>
                                                <th>Sr.No.</th>
                                                <th>Name of Product / Service</th>
                                                <th>HSN/SAC</th>
                                                <th>QTY</th>
                                                <th>Rate</th>
                                                <th>Taxable Value</th>
                                            </tr>
                                            {props.getSingleEstimate?.products?.map((val) =>
                                                val.product?.map((product, index) => {
                                                    return (
                                                        <tr key={index} style={{ height: '2rem', textAlign: 'center' }}>
                                                            <td>{index + 1}</td>
                                                            <td>{product?.name}</td>
                                                            <td>8798797</td>
                                                            <td>{product?.quantity}</td>
                                                            <td>€ {product?.price}</td>
                                                            <td style={{ textAlign: 'right', padding: '0 0.5rem' }}>
                                                                ₹ {product?.price * product?.quantity}.00
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                            <tr style={{ textAlign: 'right', height: '2rem' }}>
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ padding: '0 0.5rem', borderBottomColor: 'white' }}>Sub Total</td>
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ padding: '0 0.5rem', borderBottomColor: 'white', background: '#f1f1f1' }}>
                                                    ₹ {props.getSingleEstimate?.data?.subTotal}.00
                                                </td>
                                            </tr>
                                            <tr style={{ textAlign: 'right', height: '2rem' }}>
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ padding: '0 0.5rem', borderBottomColor: 'white' }}>
                                                    Discount [{props.getSingleEstimate?.data?.discount}%]
                                                </td>
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ borderBottomColor: 'white' }} />
                                                <td style={{ padding: '0 0.5rem', borderBottomColor: 'white', background: '#f1f1f1' }}>
                                                    {props.discountAmount}
                                                </td>
                                            </tr>
                                            <tr style={{ textAlign: 'right', height: '2rem' }}>
                                                <td />
                                                <td style={{ padding: '0 0.5rem' }}>IGST5 [{props.getSingleEstimate?.data?.tax}%]</td>
                                                <td />
                                                <td />
                                                <td />
                                                <td style={{ padding: '0 0.5rem', background: '#f1f1f1' }}>{props.taxValue}</td>
                                            </tr>
                                            <tr style={{ height: '2rem', textAlign: 'center', background: '#f1f1f1' }}>
                                                <td colSpan={3} style={{ textAlign: 'right', paddingRight: '1rem' }}>
                                                    Total
                                                </td>
                                                <td>
                                                    {props.getSingleEstimate?.products?.map((val) =>
                                                        val.product?.reduce((acc, val) => {
                                                            return acc + val?.quantity;
                                                        }, 0)
                                                    )}
                                                </td>
                                                <td />
                                                <td style={{ textAlign: 'right', padding: '0 0.5rem' }}>
                                                    {' '}
                                                    {Math.round(props.getSingleEstimate?.data?.grandTotal)}.00
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table style={{ width: '100%', textAlign: 'center', fontSize: 14 }}>
                                        <tbody>
                                            <tr>
                                                <td>Taxable Value</td>
                                                <td>Discount</td>
                                                <td>IGST5</td>
                                                <td>Total</td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '0.5fr 2fr'
                                                        }}
                                                    >
                                                        <div style={{ borderRight: '1px solid black' }}>%</div>
                                                        <div>Amount</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '0.5fr 2fr'
                                                        }}
                                                    >
                                                        <div style={{ borderRight: '1px solid black' }}>%</div>
                                                        <div>Amount</div>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>{props.getSingleEstimate?.data?.subTotal}</td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '0.5fr 2fr'
                                                        }}
                                                    >
                                                        <div style={{ borderRight: '1px solid black' }}>
                                                            {props.getSingleEstimate?.data?.discount}
                                                        </div>
                                                        <div>{props.discountAmount}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '0.5fr 2fr'
                                                        }}
                                                    >
                                                        <div style={{ borderRight: '1px solid black' }}>
                                                            {props.getSingleEstimate?.data?.tax}
                                                        </div>
                                                        <div>{props.taxValue}</div>
                                                    </div>
                                                </td>
                                                <td>₹ {Math.round(props.getSingleEstimate?.data?.grandTotal)}.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'auto auto',
                                            textAlign: 'center',
                                            fontSize: 14
                                        }}
                                    >
                                        <div style={{ display: 'grid', borderRight: '1px solid black' }}>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    padding: '0.5rem 0'
                                                }}
                                            >
                                                <b>Bank Details </b>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    padding: '0.5rem 0'
                                                }}
                                            >
                                                {props.estimateBusinessData?.bankName ||
                                                props.estimateBusinessData?.branchName ||
                                                props.estimateBusinessData?.accountNumber ||
                                                props.estimateBusinessData?.bankIfscCode ? (
                                                    <div>
                                                        <p>
                                                            Bank Name: {props.estimateBusinessData?.bankName},{' '}
                                                            {props.estimateBusinessData?.branchName}
                                                        </p>
                                                        <p>A/C No: {props.estimateBusinessData?.accountNumber}</p>
                                                        <p>IFSC Code: {props.estimateBusinessData?.bankIfscCode}</p>
                                                    </div>
                                                ) : (
                                                    'Bank Details Not Found !'
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    padding: '0.5rem 0'
                                                }}
                                            >
                                                <b>Terms and Conditions </b>
                                            </div>
                                            <div style={{ padding: '1rem 0 3rem 0', textAlign: 'left', padding: '1rem' }}>
                                                <p>1. 10 days return policy</p>
                                                <p>2. Damaged items won't be taken back Bill is compulsory for returning items.</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid' }}>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    padding: '0.5rem'
                                                }}
                                            >
                                                <div>Certified that the particulars given above are true and correct</div>
                                                <div>
                                                    <b>FOR {props.getSingleEstimate?.data?.title}</b>
                                                </div>
                                            </div>
                                            <div style={{ borderBottom: '1px solid black' }}>&nbsp;</div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    padding: '0.5rem'
                                                }}
                                            >
                                                <div>This is an electronically generated document, no signature is required.</div>
                                                <div>Authorised Signature</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
});

export default Template4;
