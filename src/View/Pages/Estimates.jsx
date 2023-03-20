import React from 'react';

const Estimates = () => {
    const columns = [
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true
        },
        {
            name: 'Name',
            selector: (row) => row.date,
            sortable: true
        },
        {
            name: 'HSN Code',
            selector: (row) => row.number,
            sortable: true
        },
        {
            name: 'Price',
            selector: (row) => row.price,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        <Button onClick={() => handleEdit(row)} className="btn-icon btn-rounded m-r-10" variant="info">
                            <i className="icon feather icon-edit" aria-hidden="true" />
                        </Button>

                        <Button onClick={() => handleDelete(row)} className="btn-icon btn-rounded" variant="danger">
                            <i className="icon feather icon-trash-2" aria-hidden="true" />
                        </Button>
                    </div>
                );
            }
        }
    ];
    return <div>Estimates</div>;
};

export default Estimates;
