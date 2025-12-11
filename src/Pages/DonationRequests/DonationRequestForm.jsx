import React from "react";
import { FaChevronDown } from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonationRequestForm = ({
  formData,
  setFormData,
  districts,
  filteredUpazilas,
  recipientDistrict,
  setRecipientDistrict,
  recipientUpazila,
  setRecipientUpazila,
  onSubmit,
  disabled = false,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const SelectWrapper = ({ children }) => (
    <div className="relative">
      {children}
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Recipient Info */}
      <input
        type="text"
        name="recipientName"
        value={formData.recipientName}
        onChange={handleChange}
        required
        placeholder="Recipient Name"
        className="w-full input"
        disabled={disabled}
      />

      <SelectWrapper>
        <select
          value={recipientDistrict}
          onChange={(e) => {
            setRecipientDistrict(e.target.value);
            setRecipientUpazila("");
          }}
          required
          className="w-full input appearance-none cursor-pointer"
          disabled={disabled}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </SelectWrapper>

      <SelectWrapper>
        <select
          value={recipientUpazila}
          onChange={(e) => setRecipientUpazila(e.target.value)}
          required
          disabled={!recipientDistrict || disabled}
          className={`w-full input appearance-none cursor-pointer ${
            !recipientDistrict ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
          }`}
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((upa) => (
            <option key={upa.id} value={upa.id}>
              {upa.name}
            </option>
          ))}
        </select>
      </SelectWrapper>

      <input
        type="text"
        name="hospitalName"
        value={formData.hospitalName}
        onChange={handleChange}
        required
        placeholder="Hospital Name"
        className="w-full input"
        disabled={disabled}
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder="Full Address Line"
        className="w-full input"
        disabled={disabled}
      />

      <SelectWrapper>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="w-full input appearance-none cursor-pointer"
          disabled={disabled}
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </SelectWrapper>

      <input
        type="date"
        name="donationDate"
        value={formData.donationDate}
        onChange={handleChange}
        required
        className="w-full input"
        disabled={disabled}
      />

      <input
        type="time"
        name="donationTime"
        value={formData.donationTime}
        onChange={handleChange}
        required
        className="w-full input"
        disabled={disabled}
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Request Message"
        className="w-full input h-24"
        disabled={disabled}
      />

      <button
  type="submit"
  disabled={disabled}
  className={`btn ${
    disabled
      ? "opacity-50 cursor-not-allowed"
      : " w-full bg-linear-to-r from-[#BC1823] to-[#3f060a] text-white cursor-pointer"
  }`}
>
  Create Request
</button>
    </form>
  );
};

export default DonationRequestForm;
