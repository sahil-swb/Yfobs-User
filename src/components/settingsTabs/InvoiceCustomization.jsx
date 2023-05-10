import { Field, Form, Formik } from 'formik';
import reactCSS from 'reactcss';
import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import '../../assets/css/invoiceCustomStyle.css';
import InvoicesPreview from '../InvoicesPreview';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalIsOpen, commonModalType } from '../../slices/modalSlice';
import TemplateImage from '../TemplateImage';
import ColorPicker from '../ColorPicker';
import template1 from '../../assets/images/invoiceTemplateImages/template-1.png';
import template2 from '../../assets/images/invoiceTemplateImages/template-2.png';
import template3 from '../../assets/images/invoiceTemplateImages/template-3.png';
import template4 from '../../assets/images/invoiceTemplateImages/template-4.png';
import { getSingleBusiness, updateBusiness } from '../../slices/settingsSlice';
import { businessId } from '../../constants/userData';

const InvoiceCustomization = () => {
    const { getSingleBusinessData } = useSelector((state) => state.settingsReducer);
    const [color, setColor] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const config = {
        readonly: false
    };
    const handleSubmit = (values) => {
        let payload = {
            _id: getSingleBusinessData?._id,
            userId: getSingleBusinessData?.userId,
            templateStyle: values.templateStyle,
            color: values.color,
            footerNote: content
        };
        dispatch(updateBusiness({ payload }));
    };

    useEffect(() => {
        let payload = {
            _id: businessId
        };
        dispatch(getSingleBusiness({ payload }));
    }, []);

    useEffect(() => {
        setColor(getSingleBusinessData?.color);
    }, [getSingleBusinessData?.color]);

    return (
        <>
            <Card>
                <Formik
                    enableReinitialize
                    initialValues={{
                        templateStyle: getSingleBusinessData?.templateStyle || '',
                        color: color || ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form>
                        <Card.Header>Invoice Customization</Card.Header>

                        <Card.Body>
                            <div>
                                <Row>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-1'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={template1} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="templateStyle" value="Template1" />
                                                    <span>Template 1</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-2'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={template2} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="templateStyle" value="Template2" />
                                                    <span>Template 2</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-3'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={template3} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="templateStyle" value="Template3" />
                                                    <span>Template 3</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <div
                                                onClick={() => {
                                                    dispatch(commonModalIsOpen(true));
                                                    dispatch(commonModalType('INVOICE-4'));
                                                }}
                                            >
                                                <InvoicesPreview>
                                                    <Card.Img className="cursor-pointer" variant="top" src={template4} />
                                                </InvoicesPreview>
                                            </div>
                                            <Card.Body>
                                                <label className="d-flex justify-content-center cursor-pointer">
                                                    <Field type="radio" name="templateStyle" value="Template4" />
                                                    <span>Template 4</span>
                                                </label>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mt-3">
                                <label>Change Invoice Template Color</label>
                                <div className="d-flex align-items-center justify-between">
                                    <div className="w-50 mr-2">
                                        <Field className="form-control border" type="text" name="color" />
                                    </div>
                                    <div>
                                        {/* {console.log(color)} */}
                                        <ColorPicker color={color} setColor={setColor} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label>Set default footer note for invoice</label>
                                <JoditEditor
                                    value={getSingleBusinessData?.footerNote ? getSingleBusinessData?.footerNote : ''}
                                    config={config}
                                    onBlur={(content) => setContent(content)}
                                />
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit">Submit</Button>
                        </Card.Footer>
                    </Form>
                </Formik>
            </Card>
            <TemplateImage />
        </>
    );
};

export default InvoiceCustomization;
