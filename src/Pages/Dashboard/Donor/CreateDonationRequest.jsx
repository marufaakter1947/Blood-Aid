import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { getAuth } from "firebase/auth";
import DonationRequestForm from "../../DonationRequests/DonationRequestForm";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";


const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  


  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [recipientDistrict, setRecipientDistrict] = useState("");
  const [recipientUpazila, setRecipientUpazila] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  // Load districts & upazilas
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        setDistricts(table.data.sort((a, b) => a.name.localeCompare(b.name)));
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        setUpazilas(table.data);
      });
  }, []);

  useEffect(() => {
    if (recipientDistrict) {
      setFilteredUpazilas(
        upazilas.filter(
          (upa) => String(upa.district_id) === String(recipientDistrict)
        )
      );
    } else setFilteredUpazilas([]);
  }, [recipientDistrict, upazilas]);

  useEffect(() => {
  if (!user) return;

  const loadUser = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setDbUser(data);
  };

  loadUser();
}, [user]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const requestData = {
        requesterName: user.displayName,
        requesterEmail: user.email,
        recipientName: formData.recipientName,
        recipientDistrict: districts.find(
          (d) => String(d.id) === String(recipientDistrict)
        )?.name,
        recipientUpazila: filteredUpazilas.find(
          (u) => u.id === String(recipientUpazila)
        )?.name,
        hospitalName: formData.hospitalName,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        donationDate: formData.donationDate,
        donationTime: formData.donationTime,
        message: formData.message,
        status: "pending",
      };

      await fetch(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      toast.success("Donation request created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create donation request.");
    }
  };
  // if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (dbUser?.status === "blocked") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600 text-center">
          You are blocked! You cannot create a donation request.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className=" text-2xl font-bold text-red-600 mb-4">
        Create Donation Request
      </h2>

      <DonationRequestForm
        formData={formData}
        setFormData={setFormData}
        districts={districts}
        filteredUpazilas={filteredUpazilas}
        recipientDistrict={recipientDistrict}
        setRecipientDistrict={setRecipientDistrict}
        recipientUpazila={recipientUpazila}
        setRecipientUpazila={setRecipientUpazila}
        onSubmit={handleSubmit}
        submitText="Create Request"
        disabled={dbUser?.status === "blocked"}
      />
    </div>
  );
};

export default CreateDonationRequest;
