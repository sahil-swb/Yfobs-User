import React from 'react';
import yfobsLogo from '../../assets/images/official-yfobs-logo.png';

const Template3 = React.forwardRef((props, ref) => {
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
                                                {props.type === 'Invoice'
                                                    ? props.getSingleInvoiceData?.data?.title
                                                    : props.getSingleEstimate?.data?.title}
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
                                                        background:
                                                            props.type === 'Invoice'
                                                                ? props.invoiceBusinessData?.color || '#e7d8e8'
                                                                : props.estimateBusinessData?.color || '#e7d8e8',
                                                        padding: '0.5rem 0 0.5rem 0.5rem',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {props.type === 'Invoice'
                                                        ? props.getSingleInvoiceData?.data?.summary
                                                        : props.getSingleEstimate?.data?.summary}
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
                                                        background:
                                                            props.type === 'Invoice'
                                                                ? props.invoiceBusinessData?.color || '#e7d8e8'
                                                                : props.estimateBusinessData?.color || '#e7d8e8',
                                                        padding: '0.5rem 0.8rem'
                                                    }}
                                                >
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                        {console.log('props.getSingleInvoiceData', props.getSingleInvoiceData)}
                                        <div style={{ width: '50%' }}>
                                            <p style={{ padding: '0 0 0.5rem 0.5rem' }}>
                                                {props.type === 'Invoice'
                                                    ? props?.invoiceBusinessData?.address
                                                    : props?.estimateBusinessData?.address}
                                            </p>
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
                                            <b>
                                                GSTIN:{' '}
                                                {props.type === 'Invoice'
                                                    ? props.invoiceBusinessData?.vatCode
                                                    : props.estimateBusinessData?.vatCode}
                                            </b>
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
                                                                    <span>
                                                                        {props.type === 'Invoice'
                                                                            ? props.getSingleInvoiceData?.data?.customerName
                                                                            : props.getSingleEstimate?.data?.customerName}
                                                                    </span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>Address: </b>
                                                                    <span>
                                                                        {props.type === 'Invoice'
                                                                            ? props.invoiceCustomerData?.address
                                                                            : props.estimateCustomerData?.address}
                                                                    </span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>PHONE: </b>
                                                                    <span>
                                                                        {props.type === 'Invoice'
                                                                            ? props.invoiceCustomerData?.phone
                                                                            : props.estimateCustomerData?.phone}
                                                                    </span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>GSTIN: </b>
                                                                    <span>
                                                                        {props.type === 'Invoice'
                                                                            ? props.invoiceCustomerData?.vatCode
                                                                            : props.estimateCustomerData?.vatCode}
                                                                    </span>
                                                                </li>
                                                                <li
                                                                    style={{
                                                                        display: 'grid',
                                                                        gridTemplateColumns: '0.7fr 2fr'
                                                                    }}
                                                                >
                                                                    <b>Place of Supply : </b>
                                                                    <span>
                                                                        {props.type === 'Invoice'
                                                                            ? props.getSingleInvoiceData?.data?.customerState
                                                                            : props.getSingleEstimate?.data?.customerState}
                                                                        ,{' '}
                                                                        {props.type === 'Invoice'
                                                                            ? props.getSingleInvoiceData?.data?.customerCountry
                                                                            : props.getSingleEstimate?.data?.customerCountry}
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
                                                        <span>
                                                            {props.type === 'Invoice'
                                                                ? props.getSingleInvoiceData?.data?.date
                                                                : props.getSingleEstimate?.data?.date}
                                                        </span>
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
                                                        <span>
                                                            {props.type === 'Invoice'
                                                                ? props.getSingleInvoiceData?.data?.posoNumber
                                                                : props.getSingleEstimate?.data?.posoNumber}
                                                        </span>
                                                    </li>
                                                    <li
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr 1fr'
                                                        }}
                                                    >
                                                        <b>Due date :</b>
                                                        <span>
                                                            {props.type === 'Invoice'
                                                                ? props.getSingleInvoiceData?.data?.expireOn
                                                                : props.getSingleEstimate?.data?.expireOn}
                                                        </span>
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
                                            <tr style={{ height: '2rem', background: '#f1f1f1', textAlign: 'center' }}>
                                                <th>Sr.No.</th>
                                                <th>Name of Product / Service</th>
                                                <th>HSN/SAC</th>
                                                <th>QTY</th>
                                                <th>Rate</th>
                                                <th>Total</th>
                                            </tr>
                                            {props.type === 'Invoice'
                                                ? props.getSingleInvoiceData?.products?.map((val) =>
                                                      val.product?.map((product, index) => {
                                                          return (
                                                              <tr key={index} style={{ height: '2rem', textAlign: 'center' }}>
                                                                  <td>{index + 1}</td>
                                                                  <td>{product?.name}</td>
                                                                  <td>8798797</td>
                                                                  <td>{product?.quantity}</td>
                                                                  <td>
                                                                      {props?.currencySign} {product?.price}
                                                                  </td>
                                                                  <td
                                                                      style={{
                                                                          textAlign: 'right',
                                                                          padding: '0 0.5rem',
                                                                          background: '#f1f1f1'
                                                                      }}
                                                                  >
                                                                      {props?.currencySign} {product?.price * product?.quantity}.00
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })
                                                  )
                                                : props.getSingleEstimate?.products?.map((val) =>
                                                      val.product?.map((product, index) => {
                                                          return (
                                                              <tr key={index} style={{ height: '2rem', textAlign: 'center' }}>
                                                                  <td>{index + 1}</td>
                                                                  <td>{product?.name}</td>
                                                                  <td>8798797</td>
                                                                  <td>{product?.quantity}</td>
                                                                  <td>
                                                                      {props?.currencySign} {product?.price}
                                                                  </td>
                                                                  <td
                                                                      style={{
                                                                          textAlign: 'right',
                                                                          padding: '0 0.5rem',
                                                                          background: '#f1f1f1'
                                                                      }}
                                                                  >
                                                                      {props?.currencySign} {product?.price * product?.quantity}.00
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })
                                                  )}
                                            <tr style={{ height: '2rem', textAlign: 'center', background: '#f1f1f1' }}>
                                                <td colSpan={3} style={{ textAlign: 'right', paddingRight: '1rem' }}>
                                                    Total
                                                </td>
                                                <td>
                                                    {props.type === 'Invoice'
                                                        ? props.getSingleInvoiceData?.products?.map((val) =>
                                                              val.product?.reduce((acc, val) => {
                                                                  return acc + val?.quantity;
                                                              }, 0)
                                                          )
                                                        : props.getSingleEstimate?.products?.map((val) =>
                                                              val.product?.reduce((acc, val) => {
                                                                  return acc + val?.quantity;
                                                              }, 0)
                                                          )}
                                                </td>
                                                <td />
                                                <td style={{ textAlign: 'right', padding: '0 0.5rem' }}>
                                                    {props?.currencySign}{' '}
                                                    {props.type === 'Invoice'
                                                        ? props.getSingleInvoiceData?.data?.subTotal
                                                        : props.getSingleEstimate?.data?.subTotal}
                                                    .00
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
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1.5fr 1fr',
                                            fontSize: 14
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateRows: '30px 40px 30px 150px 30px 100px',
                                                textAlign: 'center',
                                                border: '1px solid black'
                                            }}
                                        >
                                            <div style={{ borderBottom: '1px solid black' }}>
                                                <b>Total in word </b>
                                            </div>
                                            <div style={{ borderBottom: '1px solid black' }}>
                                                <p>{props.words}</p>
                                            </div>
                                            <div style={{ borderBottom: '1px solid black' }}>
                                                <b>Bank Details</b>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {props.type === 'Invoice' ? (
                                                    props.invoiceBusinessData?.bankName ||
                                                    props.invoiceBusinessData?.branchName ||
                                                    props.invoiceBusinessData?.accountNumber ||
                                                    props.invoiceBusinessData?.bankIfscCode ? (
                                                        <div>
                                                            <p>
                                                                Bank Name: {props.invoiceBusinessData?.bankName},{' '}
                                                                {props.invoiceBusinessData?.branchName}
                                                            </p>
                                                            <p>A/C No: {props.invoiceBusinessData?.accountNumber}</p>
                                                            <p>IFSC Code: {props.invoiceBusinessData?.bankIfscCode}</p>
                                                        </div>
                                                    ) : (
                                                        'Bank Details Not Found !'
                                                    )
                                                ) : props.estimateBusinessData?.bankName ||
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
                                            <div style={{ borderBottom: '1px solid black' }}>
                                                <b>Terms and Conditions </b>
                                            </div>
                                            <div style={{ borderBottom: '1px solid black' }}>
                                                <p>This is an electronically generated document, no signature is required.</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', border: '1px solid black' }}>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '0 0.5rem',
                                                    background: '#f1f1f1'
                                                }}
                                            >
                                                <span>Taxable Amount</span>
                                                <span>
                                                    {props?.currencySign}{' '}
                                                    {props.type === 'Invoice'
                                                        ? props.getSingleInvoiceData?.data?.subTotal
                                                        : props.getSingleEstimate?.data?.subTotal}
                                                    .00
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '0 0.5rem'
                                                }}
                                            >
                                                <span>
                                                    Discount [
                                                    {props.type === 'Invoice'
                                                        ? props.getSingleInvoiceData?.data?.discount
                                                        : props.getSingleEstimate?.data?.discount}
                                                    %]
                                                </span>
                                                <span>
                                                    {props?.currencySign} {props.discountAmount}{' '}
                                                </span>
                                            </div>

                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '0 0.5rem'
                                                }}
                                            >
                                                <span>
                                                    Add: IGST5 [
                                                    {props.type === 'Invoice'
                                                        ? props?.getSingleInvoiceData?.data?.tax
                                                        : props.getSingleEstimate?.data?.tax}
                                                    %]
                                                </span>
                                                <span>
                                                    {props?.currencySign} {props.taxValue}{' '}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    padding: '0 0.5rem',
                                                    background: '#f1f1f1'
                                                }}
                                            >
                                                <b style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Total Amout After Tax</span>
                                                    <span>
                                                        {props?.currencySign}{' '}
                                                        {Math.round(
                                                            props.type === 'Invoice'
                                                                ? props.getSingleInvoiceData?.data?.grandTotal
                                                                : props.getSingleEstimate?.data?.grandTotal
                                                        )}
                                                        .00{' '}
                                                    </span>
                                                </b>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    padding: '0 0.5rem',
                                                    background: '#f1f1f1'
                                                }}
                                            >
                                                <span>(E &amp; O.E.)</span>
                                            </div>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    display: 'grid',
                                                    justifyContent: 'space-between',
                                                    gridTemplateColumns: '1fr 0.5fr'
                                                }}
                                            >
                                                <div>GST Payable on Reverse Charge.</div>
                                                <div style={{ background: '#f1f1f1', textAlign: 'end', padding: '0 0.5rem' }}>N.A.</div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    lineHeight: 10
                                                }}
                                            >
                                                <p>
                                                    <b>
                                                        FOR{' '}
                                                        {props.type === 'Invoice'
                                                            ? props.getSingleInvoiceData?.data?.title
                                                            : props.getSingleEstimate?.data?.title}{' '}
                                                    </b>
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <p>Authorised Signature</p>
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

export default Template3;
