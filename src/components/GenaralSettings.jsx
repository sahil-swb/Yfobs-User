import React, { useEffect, useState } from 'react';
import { Field, Formik, Form } from 'formik';
import { Row, Col, Button, Card } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { genaralSettings, getAllGenaralSettings } from '../slices/settingsSlice';

import './customcss.css';
import { genaralFaviconUpload, genaralImageUpload, genaralUploadLogo } from '../slices/imageUpload';
//custom data for selector
export const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E', isFixed: true },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' }
];
//genaral settings
const GenaralSettings = () => {
    const dispatch = useDispatch();
    // const result = useSelector((state) => state.genaral.genaralSettingsData);
    const imageUrls = useSelector((state) => state.imageUrl);
    const prefillData = useSelector((state) => state.genaral.allGenaralSettingsData[0]);
    const [image, setImage] = useState({ imageUrl: 'https://ableproadmin.com/react/default/static/media/dashborad-1.caf9fcc6.jpg' });
    const [favicon, setFavicon] = useState({ imageUrl: 'https://ableproadmin.com/react/default/static/media/dashborad-1.caf9fcc6.jpg' });
    const [logo, setLogo] = useState({ imageUrl: 'https://ableproadmin.com/react/default/static/media/dashborad-1.caf9fcc6.jpg' });

    const [data, setData] = useState({
        defaultSwitch: true,
        tags: [
            // { id: 1, name: 'Washington' },
            // { id: 2, name: 'Sydney' },
            // { id: 3, name: 'Beijing' }
        ],
        tagsSuggestions: [
            { id: 1, name: 'Amsterdam' },
            { id: 2, name: 'Washington' },
            { id: 3, name: 'Los Angeles' }
        ],
        suggestions: [
            { id: 1, name: 'Amsterdam' },
            { id: 2, name: 'Beijing' },
            { id: 3, name: 'Cairo' },
            { id: 4, name: 'Los Angeles' },
            { id: 5, name: 'Sydney' },
            { id: 6, name: 'Washington' }
        ]
    });

    const handleDelete = (i) => {
        const tags = data.tags.slice(0);
        tags.splice(i, 1);
        setData({ ...data, tags: tags });
    };
    const handleAddition = (tag) => {
        const tags = [...data.tags, tag];
        setData({ ...data, tags: tags });
    };
    const handleLogoFileSubmit = (e) => {
        let baseURL = '';
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            baseURL = reader.result;
            setLogo({ imageUrl: URL.createObjectURL(e.target.files[0]), image: baseURL });
        };
    };
    const handleFaviconFileSubmit = (e) => {
        let baseURL = '';
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            baseURL = reader.result;
            setFavicon({ imageUrl: URL.createObjectURL(e.target.files[0]), image: baseURL });
        };
    };

    const handleImageHandle = (e) => {
        let baseURL = '';
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            baseURL = reader.result;
            console.log(baseURL);
            setImage({ imageUrl: URL.createObjectURL(e.target.files[0]), image: baseURL });
        };
    };
    const handleSubmit = (values) => {
        console.log('ksjaldlkjaljdllkajdljalj', data.tags);
        let payload = {
            id: '63a9a0977ed9a103a4b911bb',
            name: values.name,
            description: values.description,
            footerAbout: values.footerAbout,
            adminEmail: values.email,
            copyright: values.copyright,
            keywords: data.tags
            // tagsSuggestions: values.tagsSuggestions,
            // suggestions: values.suggestions
        };
        const payloadLogo = {
            id: '63a9a0977ed9a103a4b911bb',
            type: 'logo',
            file: logo.image
        };
        const payloadImage = {
            id: '63a9a0977ed9a103a4b911bb',
            type: 'heroImage',
            file: image.image
        };
        const payloadFavicon = {
            id: '63a9a0977ed9a103a4b911bb',
            type: 'heroImage',
            file: image.image
        };
        dispatch(genaralSettings({ payload }));
        dispatch(genaralUploadLogo({ payloadLogo }));
        dispatch(genaralImageUpload({ payloadImage }));
        dispatch(genaralFaviconUpload({ payloadFavicon }));
    };

    useEffect(() => {
        dispatch(getAllGenaralSettings());
        //note:image prefill is pending
    }, []);
    console.log('######', data?.tags);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-2">Update Settings</h5>
                        </Card.Header>

                        <Card.Body>
                            <Row className="mb-4">
                                <Col className="text-center genarl-col">
                                    <div>
                                        <img
                                            src={!prefillData?.heroImage ? image.imageUrl : prefillData?.heroImage}
                                            className="img-thumbnail mb-3"
                                            alt="logo-img"
                                        />
                                        <div className="upload_img position-relative">
                                            <button className="btn-files">
                                                <i className="feather icon-upload-cloud" /> Update image
                                            </button>
                                            <input className="file-input" type="file" onChange={(e) => handleImageHandle(e)} />
                                        </div>
                                    </div>
                                </Col>
                                <Col className="text-center genarl-col">
                                    <div>
                                        <img
                                            src={!prefillData?.favicon ? favicon.imageUrl : prefillData?.favicon}
                                            className="img-thumbnail mb-3"
                                            alt="logo-img"
                                        />
                                        <div className="upload_img position-relative">
                                            <button className="btn-files">
                                                <i className="feather icon-upload-cloud" /> Update image
                                            </button>
                                            <input className="file-input" type="file" onChange={(e) => handleFaviconFileSubmit(e)} />
                                        </div>
                                    </div>
                                </Col>
                                <Col className="text-center genarl-col">
                                    <div>
                                        <img
                                            src={!prefillData?.logo ? logo?.imageUrl : prefillData?.logo}
                                            className="img-thumbnail mb-3"
                                            alt="logo-img"
                                        />

                                        <div className="upload_img position-relative">
                                            <button className="btn-files">
                                                <i className="feather icon-upload-cloud" /> Update image
                                            </button>
                                            <input className="file-input" type="file" onChange={(e) => handleLogoFileSubmit(e)} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Formik
                                        enableReinitialize
                                        initialValues={{
                                            applicationName: prefillData?.siteName,
                                            applicationTitle: prefillData?.siteTitle,
                                            description: prefillData?.description,
                                            footerAbout: prefillData?.footerAbout,
                                            email: prefillData?.adminEmail,
                                            copyright: prefillData?.copyright
                                        }}
                                        onSubmit={(values) => handleSubmit(values)}
                                    >
                                        <Form>
                                            <label className="form-label">Application Name</label>
                                            <Field name="applicationName" className="form-control mb-2" />
                                            <label className="form-label">Application Title</label>
                                            <Field name="applicationTitle" className="form-control mb-2" />
                                            <label className="form-label mt-2">Keywords</label>
                                            <ReactTags
                                                classNames={{
                                                    root: 'react-tags bootstrap-tagsinput',
                                                    selectedTag: 'react-tags__selected-tag btn-primary'
                                                }}
                                                allowNew={true}
                                                tags={data.tags}
                                                onDelete={handleDelete}
                                                onAddition={handleAddition}
                                            />
                                            <label className="form-label mt-2">Description</label>
                                            <Field name="description" className="form-control mb-2 " as="textarea" />
                                            <label className="form-label">Footer About</label>
                                            <Field as="textarea" name="footerAbout" className="form-control mb-2" />
                                            <label className="form-label">Admin Email</label>
                                            <Field name="email" type="email" className="form-control mb-2" />
                                            <label className="form-label">Copyright</label>
                                            <Field name="copyright" className="form-control mb-2" />
                                            <Button type="submit">Save Changes</Button>
                                        </Form>
                                    </Formik>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default GenaralSettings;
