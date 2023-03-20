import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Card } from 'react-bootstrap';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux';
import { getAllGenaralSettings, termsSettings } from '../slices/settingsSlice';
import { useSelector } from 'react-redux';
function TermsSettings() {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const prefillData = useSelector((state) => state.genaral.allGenaralSettingsData[0]);

    const config = {
        readonly: false
    };
    const handleSubmit = () => {
        console.log('here');
        let payload = {
            id: '63a9a0977ed9a103a4b911bb',
            termsAndService: content
        };
        console.log(payload);
        dispatch(termsSettings({ payload }));
    };
    useEffect(() => {
        dispatch(getAllGenaralSettings());
    }, []);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-2">Update Settings</h5>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <label className="form-label">Terms of service</label>
                                <JoditEditor
                                    value={prefillData?.termsAndService}
                                    config={config}
                                    onBlur={(content) => setContent(content)}
                                />
                            </div>
                            <br />
                            <br />

                            <Button onClick={(e) => handleSubmit(e)}>Save Changes</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default TermsSettings;
