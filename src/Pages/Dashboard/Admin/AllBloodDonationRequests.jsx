import React from 'react';
import DonationRequestsTable from '../../DonationRequests/DonationRequestsTable';

const AllBloodDonationRequests = () => {
    return (
        <div>
            <DonationRequestsTable  fetchAll={true} title="All Donation Requests"></DonationRequestsTable>
        </div>
    );
};

export default AllBloodDonationRequests;