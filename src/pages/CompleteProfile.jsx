import { useState } from "react";
import axios from "axios";
import MapPicker from "../components/MapPicker";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    ngoName: "",
    contactPersonName: "",
  });

  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let payload = {
        role,
        name: form.name,
        phone: form.phone,
        address: form.address,
        latitude: form.latitude,
        longitude: form.longitude,
      };

      // NGO specific
      if (role === "NGO") {
        payload.ngoName = form.ngoName;
        payload.contactPersonName =
          form.contactPersonName;
      }

      console.log("PAYLOAD:", payload);

      const res = await axios.post(
        "http://localhost:8080/user/complete-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sessionStorage.setItem("token", res.data.token );
      sessionStorage.setItem("role",res.data.role.toLowerCase());
      alert("Profile completed successfully!");
      navigate("/home");
    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);
      }

      alert(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-y-auto">

      <div className="flex justify-center px-4 py-10">

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="bg-green-600 px-8 py-7 text-white">
            <h1 className="text-3xl font-bold">
              Complete Your Profile
            </h1>

            <p className="text-green-100 mt-2 text-sm">
              Join the food redistribution network
              and help reduce food waste.
            </p>
          </div>

          {/* FORM */}
          <div className="p-8 space-y-6">

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="">Choose Role</option>
                <option value="DONOR">
                  Food Donor
                </option>
                <option value="VOLUNTEER">
                  Volunteer
                </option>
                <option value="NGO">
                  NGO
                </option>
              </select>
            </div>

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                placeholder="Enter phone number"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* NGO ONLY */}
            {role === "NGO" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NGO Name
                  </label>

                  <input
                    type="text"
                    name="ngoName"
                    value={form.ngoName}
                    placeholder="Enter NGO name"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person Name
                  </label>

                  <input
                    type="text"
                    name="contactPersonName"
                    value={form.contactPersonName}
                    placeholder="Enter contact person name"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>

              <textarea
                name="address"
                value={form.address}
                rows="3"
                placeholder="Enter complete address"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            {/* MAP */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Location
              </label>

              <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
                <MapPicker setForm={setForm} />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Click on the map to choose your
                exact location.
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl"
            >
              Complete Profile
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;