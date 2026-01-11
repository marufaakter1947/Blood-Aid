import React from 'react';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-red-600 font-bold mb-4 pt-10">Terms of Service</h1>

      <p className="mb-3">
        By accessing and using BloodAid, you agree to comply with and be bound
        by these Terms of Service.
      </p>

      <p className="mb-3">
        Users must provide accurate and complete information. Providing false
        or misleading information is strictly prohibited.
      </p>

      <p className="mb-3">
        BloodAid reserves the right to suspend or terminate accounts that
        violate these terms.
      </p>

      <p>
        We may update these terms at any time. Continued use of the service
        means you accept the updated terms.
      </p>
    </div>
    );
};

export default TermsOfService;