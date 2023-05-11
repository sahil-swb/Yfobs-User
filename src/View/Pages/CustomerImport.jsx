import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { businessId, userId } from '../../constants/userData';
import { useDispatch, useSelector } from 'react-redux';
import { customerUploadCsv } from '../../slices/customersSlice';
import '../../assets/css/customerImportStyle.css';
import { Link } from 'react-router-dom';

const CustomerImport = () => {
    const dispatch = useDispatch();
    const [csvFile, setCsvFile] = useState('');

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setCsvFile(base64);
    };

    const handleFileSubmit = (event) => {
        event.preventDefault();
        const payload = {
            file: csvFile,
            userId: userId,
            businessId: businessId
        };
        dispatch(customerUploadCsv({ payload }));
    };

    console.log('csvFile---', csvFile);

    return (
        <>
            <div className="card p-4">
                <h2>Import customer from CSV</h2>
                <p className="my-4 csv-info">
                    A CSV (comma-separated values) file is a spreadsheet file that is used by Wave to import customer information into your
                    business.
                </p>
                <div className="border border-dark rounded p-4">
                    <form onSubmit={handleFileSubmit}>
                        <div>
                            <input type="file" onChange={(e) => handleFile(e)} />
                        </div>
                        <div className="text-center">
                            <Button type="submit" size="lg">
                                Submit
                            </Button>
                        </div>
                    </form>
                    <hr />
                    <div className="pt-3">
                        <h6>Maximum 10MB file size. CSV file type only.</h6>
                    </div>
                </div>
                <div>
                    <h4 className="my-4 csv-heading">Customer CSV template file</h4>
                    <p className="csv-info">
                        <Link to="/customers/import">Download and view our customer CSV template.</Link> You can use this as a template for
                        creating your CSV file.
                    </p>
                </div>
                <div className="mt-5">
                    <h4 className="csv-heading">File format</h4>
                    <p className="my-3 csv-info">
                        The first line of your customer CSV <strong>must include all of the headers</strong> listed below, which are
                        included in the customer CSV template.
                    </p>
                    <div className="file-format-details">
                        <p className="py-2 csv-info">
                            <strong>Reminder:</strong> All CSV file headers are case-sensitive.
                        </p>
                        <hr />
                        <ul className="customer-details">
                            <li>
                                <div className="d-flex justify-content-between">
                                    <strong>Name </strong>
                                    <span>sdhfish</span>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <strong>Phone </strong>
                                    <span>sdhfish</span>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <strong>Email </strong>
                                    <span>sdhfish</span>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex justify-content-between">
                                    <b>Address </b>
                                    <span>sdhfish</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-5 exporting-div">
                        <h4 className="csv-heading">Exporting your CSV file from Excel or other software</h4>
                        <p className="csv-info">
                            <strong>Reminder:</strong> When importing customer information, your CSV file must be in UTF-8 format.
                        </p>
                        <p className="csv-info">
                            You can convert an Excel worksheet (such as the customer CSV template) to a text file by using the Save As
                            command. In the Save as type… box, choose the CSV (Comma delimited) text file format for the worksheet.
                        </p>
                        <p className="csv-info">
                            Most spreadsheet applications have the ability to save CSV files in UTF-8 format with the Save As... or Export
                            command, depending on the program.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerImport;
