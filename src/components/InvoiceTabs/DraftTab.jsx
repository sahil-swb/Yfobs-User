import React from 'react';
import CommonDataTable from '../CommonDataTable';

const DraftTab = ({ getAllInvoicesData, columns }) => {
    const draftInvoices = getAllInvoicesData.filter((val) => val?.status === 'draft');
    return (
        <div>
            <CommonDataTable columns={columns} data={draftInvoices} />
        </div>
    );
};

export default DraftTab;
