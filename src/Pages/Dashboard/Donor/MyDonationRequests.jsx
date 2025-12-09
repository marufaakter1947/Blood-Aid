import React from 'react';
import DonationRequestsTable from '../../DonationRequests/DonationRequestsTable';

const MyDonationRequests = () => {
    return (
        <div>
            <DonationRequestsTable fetchAll={false}></DonationRequestsTable>
        </div>
    );
};

export default MyDonationRequests;

