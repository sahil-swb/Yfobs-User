import React from 'react';
import CommonDataTable from '../CommonDataTable';

const RecurringInvoiceTab = ({ getAllInvoicesData, columns }) => {
    const recurringInvoices = getAllInvoicesData.filter((val) => val?.status === 'recurring');
    return (
        <div>
            <CommonDataTable columns={columns} data={recurringInvoices} />
        </div>
    );
};

export default RecurringInvoiceTab;
