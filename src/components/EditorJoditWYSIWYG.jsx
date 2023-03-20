//React and bootstrap imports
import * as React from 'react';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
//Package imports
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';

//Text Editor
const EditorJoditWYSIWYG = () => {
    const prefillData = '<h1>skajdladjlajdj</h1>';
    const [content, setContent] = useState('');
    const config = {
        readonly: false
    };

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <JoditEditor value={content} config={config} onChange={(content) => console.log(content)} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default EditorJoditWYSIWYG;
