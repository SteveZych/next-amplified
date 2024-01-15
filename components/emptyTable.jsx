import React from 'react';

const EmptyTable = ({statement}) => {
    return (
        <div className="emptyTable">
            <p>{statement}</p>
        </div>
    );
};

export default EmptyTable;
