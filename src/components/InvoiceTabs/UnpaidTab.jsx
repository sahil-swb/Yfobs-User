import React from 'react';
import CommonDataTable from '../CommonDataTable';

const UnpaidTab = ({ getAllInvoicesData, columns }) => {
    const unpaidInvoices = getAllInvoicesData.filter((val) => val?.status === 'unpaid');
    return (
        <div>
            <CommonDataTable columns={columns} data={unpaidInvoices} />
        </div>
    );
};

export default UnpaidTab;
