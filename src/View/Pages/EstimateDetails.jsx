import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Template1 from '../../components/invoiceTemplates/Template1';
import Template2 from '../../components/invoiceTemplates/Template2';
import Template4 from '../../components/invoiceTemplates/Template4';
import Template3 from '../../components/invoiceTemplates/Template3';
import { useDispatch, useSelector } from 'react-redux';
import { convertToInvoice, exportToPdf, getEstimateById } from '../../slices/estimatesSlice';
import { commonDeleteModal, commonModalIsOpen, setRowData } from '../../slices/modalSlice';
import EstimateSendModal from '../../components/modals/EstimateSendModal';
import DeleteConfModal from '../../components/modals/DeleteConfModal';
import { ToWords } from 'to-words';
import { getAllCountriesApi } from '../../slices/countryDetailSlice';
import { BASE_URL_FOR_USER } from '../../constants/urlConfig';

const EstimateDetails = () => {
    const { getSingleEstimate } = useSelector((state) => state.estimateReducer);
    const { getAllCountries } = useSelector((state) => state.countriesInfoReducer);
    const [estimateCustomerData, setEstimateCustomerData] = useState({});
    const [estimateBusinessData, setEstimateBusinessData] = useState({});
    const [currencySign, setCurrencySign] = useState('');
    const [exportData, setExportData] = useState('');
    const { exportToPdfData } = useSelector((state) => state.estimateReducer);
    const { _id } = useParams();
    const dispatch = useDispatch();
    const componentRef = useRef();
    const history = useHistory();

    const toWords = new ToWords();
    let estimateGrandTotal = Number(getSingleEstimate?.data?.grandTotal) || 0;
    let words = toWords.convert(estimateGrandTotal, { currency: true });

    let discountAmount =
        Number(getSingleEstimate?.data?.subTotal) -
        (Number(getSingleEstimate?.data?.subTotal) * Number(getSingleEstimate?.data?.discount)) / 100;
    let taxValue = (discountAmount * Number(getSingleEstimate?.data?.tax)) / 100;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const location = {
        pathname: `/estimates/create_estimates`,
        state: 'CREATE_ESTIMATE'
    };

    useEffect(() => {
        let payload = {
            _id: _id
        };
        dispatch(getEstimateById({ payload }));
    }, [_id]);

    useEffect(() => {
        getSingleEstimate?.customer?.map((data) => setEstimateCustomerData(data));
        getSingleEstimate?.business?.map((data) => setEstimateBusinessData(data));
    }, [getSingleEstimate?.business, getSingleEstimate?.customer]);

    useEffect(() => {
        getAllCountries.filter(
            (symbol) => symbol?.currencyName === estimateCustomerData?.currencyName && setCurrencySign(symbol?.currencySymbol)
        );
    }, [estimateCustomerData?.currencyName]);

    useEffect(() => {
        dispatch(getAllCountriesApi());
    }, []);

    // console.log('exportToPdfData---', exportToPdfData);

    return (
        <>
            <div>
                <Row className="mb-5">
                    <Col xl={{ span: 10, offset: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Link to={`/estimates/edit_estimates/${_id}`}>
                                <Button variant="outline-primary">
                                    {' '}
                                    <i className="icon feather icon-edit"></i> Edit
                                </Button>
                            </Link>
                            <Dropdown className="mx-4">
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    <i className="feather icon-settings"></i> Actions
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handlePrint}>Print</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            let payload = {
                                                _id: getSingleEstimate?.data?._id
                                            };
                                            dispatch(convertToInvoice({ payload }));
                                            history.push('/estimates');
                                        }}
                                    >
                                        Convert to Invoice
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={Link}
                                        onClick={() => {
                                            fetch(`${BASE_URL_FOR_USER}Estimates/htmlToPdf/${getSingleEstimate?.data?._id}`).then(
                                                (response) => {
                                                    response.blob().then((blob) => {
                                                        const fileURL = window.URL.createObjectURL(blob);
                                                        let alink = document.createElement('a');
                                                        alink.href = fileURL;
                                                        let pdfTitle = getSingleEstimate?.data?.title || 'SamplePDF';
                                                        alink.download = `${pdfTitle}.pdf`;
                                                        alink.click();
                                                    });
                                                }
                                            );
                                        }}
                                    >
                                        Export as PDF
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => dispatch(commonModalIsOpen(true))}>Send</Dropdown.Item>
                                    <Dropdown.Item as={Link} target="_blank" to="/estimates_preview">
                                        Preview as a Customer
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            dispatch(commonDeleteModal(true));
                                        }}
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button as={Link} to="/estimates/create_estimates" variant="outline-primary">
                                + New Estimate
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        {estimateBusinessData?.templateStyle === 'Template1' ? (
                            <Template1
                                ref={componentRef}
                                type={'Estimate'}
                                getSingleEstimate={getSingleEstimate}
                                estimateCustomerData={estimateCustomerData}
                                estimateBusinessData={estimateBusinessData}
                                discountAmount={discountAmount}
                                taxValue={taxValue}
                                words={words}
                                currencySign={currencySign}
                            />
                        ) : estimateBusinessData?.templateStyle === 'Template2' ? (
                            <Template2
                                ref={componentRef}
                                type={'Estimate'}
                                getSingleEstimate={getSingleEstimate}
                                estimateCustomerData={estimateCustomerData}
                                estimateBusinessData={estimateBusinessData}
                                discountAmount={discountAmount}
                                taxValue={taxValue}
                                words={words}
                                currencySign={currencySign}
                            />
                        ) : estimateBusinessData?.templateStyle === 'Template3' ? (
                            <Template3
                                ref={componentRef}
                                type={'Estimate'}
                                getSingleEstimate={getSingleEstimate}
                                estimateCustomerData={estimateCustomerData}
                                estimateBusinessData={estimateBusinessData}
                                discountAmount={discountAmount}
                                taxValue={taxValue}
                                words={words}
                                currencySign={currencySign}
                            />
                        ) : estimateBusinessData?.templateStyle === 'Template4' ? (
                            <Template4
                                ref={componentRef}
                                type={'Estimate'}
                                getSingleEstimate={getSingleEstimate}
                                estimateCustomerData={estimateCustomerData}
                                estimateBusinessData={estimateBusinessData}
                                discountAmount={discountAmount}
                                taxValue={taxValue}
                                words={words}
                                currencySign={currencySign}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            </div>
            <EstimateSendModal />
            <DeleteConfModal del_id={getSingleEstimate?.data?._id} type={'ESTIMATES'} title={getSingleEstimate?.data?.title} />
        </>
    );
};

export default EstimateDetails;
