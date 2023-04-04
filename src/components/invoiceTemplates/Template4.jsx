import React from 'react';

const Template4 = React.forwardRef((props, ref) => {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style
                dangerouslySetInnerHTML={{
                    __html: '\n            * {\n                margin: 0;\n                padding: 0;\n                word-break: break-all;\n            }\n            table,\n            th,\n            td {\n                border: 1px solid black;\n                border-collapse: collapse;\n            }\n        '
                }}
            />
            <div
                ref={ref}
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
                            <th style={{ fontSize: 30, color: '#802886', padding: '0.5rem' }}>SilverWebbuzz</th>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ display: 'grid', gridTemplateColumns: '8fr 1fr 1fr' }}>
                                    <div style={{ background: '#af1a7e', height: '50%' }} />
                                    <div style={{}}>
                                        <img
                                            src="../../../assets/images/official-yfobs-logo.png"
                                            alt="official-yfobs-logo"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    <div style={{ background: '#af1a7e', height: '50%' }} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '0.5rem 0'
                                    }}
                                >
                                    <div style={{ fontSize: 16 }}>
                                        <b>GSTIN:</b>
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        <b>In eius qui sunt qu</b>
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
                                                <th style={{ padding: '0.3rem 0' }}>Customer Details</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div style={{ padding: '0.5rem' }}>
                                                        <ul style={{ listStyle: 'none', lineHeight: 2 }}>
                                                            <li
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '0.5fr 2fr'
                                                                }}
                                                            >
                                                                <b>M/S: </b>
                                                                <span>Lesley Greene</span>
                                                            </li>
                                                            <li
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '0.5fr 2fr'
                                                                }}
                                                            >
                                                                <b>Address: </b>
                                                                <span>Blanditiis dolore qu, ahme, Andorra</span>
                                                            </li>
                                                            <li
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '0.5fr 2fr'
                                                                }}
                                                            >
                                                                <b>PHONE: </b>
                                                                <span>8797987898</span>
                                                            </li>
                                                            <li
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '0.5fr 2fr'
                                                                }}
                                                            >
                                                                <b>GSTIN: </b>
                                                                <span>Est mollitia n</span>
                                                            </li>
                                                            <li
                                                                style={{
                                                                    display: 'grid',
                                                                    gridTemplateColumns: '0.5fr 2fr'
                                                                }}
                                                            >
                                                                <b>Place of Supply : </b>
                                                                <span>ahmedabad</span>
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
                                                        gridTemplateColumns: '0.8fr 1fr'
                                                    }}
                                                >
                                                    <b>Invoice date :</b>
                                                    <span>04 Apr 2023</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.8fr 1fr'
                                                    }}
                                                >
                                                    <b>Invoice number :</b>
                                                    <span>752</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.8fr 1fr'
                                                    }}
                                                >
                                                    <b>Challan no :</b>
                                                    <span>8797987898</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.8fr 1fr'
                                                    }}
                                                >
                                                    <b>P.O./S.O. number :</b>
                                                    <span>856</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.8fr 1fr'
                                                    }}
                                                >
                                                    <b>Due date :</b>
                                                    <span>02 Jun 2023</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.8fr 1fr'
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
                                        <tr style={{ height: '2rem', textAlign: 'center' }}>
                                            <td>1</td>
                                            <td>Earphones</td>
                                            <td>8798797</td>
                                            <td>1</td>
                                            <td>€ 1000.00</td>
                                            <td style={{ textAlign: 'right', padding: '0 0.5rem' }}>€ 1000.00</td>
                                        </tr>
                                        <tr style={{ textAlign: 'right', height: '2rem' }}>
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ padding: '0 0.5rem', borderBottomColor: 'white' }}>Sub Total</td>
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ padding: '0 0.5rem', borderBottomColor: 'white', background: '#f1f1f1' }}>
                                                € 1000.00
                                            </td>
                                        </tr>
                                        <tr style={{ textAlign: 'right', height: '2rem' }}>
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ padding: '0 0.5rem', borderBottomColor: 'white' }}>Discount [10%]</td>
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ borderBottomColor: 'white' }} />
                                            <td style={{ padding: '0 0.5rem', borderBottomColor: 'white', background: '#f1f1f1' }}>
                                                € 100.00
                                            </td>
                                        </tr>
                                        <tr style={{ textAlign: 'right', height: '2rem' }}>
                                            <td />
                                            <td style={{ padding: '0 0.5rem' }}>IGST5 [5%]</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td style={{ padding: '0 0.5rem', background: '#f1f1f1' }}>€ 45.00</td>
                                        </tr>
                                        <tr style={{ height: '2rem', textAlign: 'center', background: '#f1f1f1' }}>
                                            <td colSpan={3} style={{ textAlign: 'right', paddingRight: '1rem' }}>
                                                Total
                                            </td>
                                            <td>1</td>
                                            <td />
                                            <td style={{ textAlign: 'right', padding: '0 0.5rem' }}>€ 1000.00</td>
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
                                            <td>€ 900.00</td>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.5fr 2fr'
                                                    }}
                                                >
                                                    <div style={{ borderRight: '1px solid black' }}>10</div>
                                                    <div>€100.00</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '0.5fr 2fr'
                                                    }}
                                                >
                                                    <div style={{ borderRight: '1px solid black' }}>5</div>
                                                    <div>€ 45.00</div>
                                                </div>
                                            </td>
                                            <td>€ 945.00</td>
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
                                            <p>Bank Details Not Found !</p>
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
                                                <b>FOR SilverWebbuzz</b>
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
        </>
    );
});

export default Template4;
