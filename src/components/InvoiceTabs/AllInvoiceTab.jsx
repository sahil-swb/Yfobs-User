import React from 'react';
import CommonDataTable from '../CommonDataTable';

const AllInvoiceTab = ({ getAllInvoicesData, columns }) => {
    return (
        <div>
            <CommonDataTable columns={columns} data={getAllInvoicesData} />
        </div>
    );
};

export default AllInvoiceTab;
