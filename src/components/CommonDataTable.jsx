//react imports
import React from 'react';
//package imports for table
import DataTable from 'react-data-table-component';
//common component for all tables
const CommonDataTable = ({ columns, data }) => {
    const finaldata = [data];
    const table = [];
    finaldata[0]?.map((ele, i) => {
        let ind = i + 1;
        let Ele = ele;
        let FinalEle = { ...Ele, index: ind };
        table.push(FinalEle);
    });

    //style for table cell and heder
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '18px',
                maxWidth: '500px !important'
            }
        },
        cells: {
            style: {
                fontSize: '16px',
                maxWidth: '500px !important'
            }
        }
    };
    //progressPending={true}
    return (
        <>
            <DataTable highlightOnHover columns={columns} data={table} pagination customStyles={customStyles} />
        </>
    );
};

export default CommonDataTable;
