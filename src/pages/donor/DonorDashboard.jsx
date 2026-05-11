import { useEffect, useRef, useState } from "react";

import {
  Package,
  Clock3,
  CheckCircle2,
  Plus,
  UtensilsCrossed,
} from "lucide-react";

import {
  createDonation,
  getMyDonations,
} from "../../services/donationService";

export default function DonorDashboard() {

  const [donations, setDonations] = useState([]);

  const [selectedTab, setSelectedTab] = useState("DASHBOARD");

  const [selectedDonation, setSelectedDonation] = useState(null);

  const createDonationRef = useRef(null);

  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    description: "",
    expiryTime: "",
    servesPeople: "",
    foodType: "VEG",
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await getMyDonations();
      setDonations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createDonation(form);

      fetchDonations();

      setForm({
        foodName: "",
        quantity: "",
        description: "",
        expiryTime: "",
        servesPeople: "",
        foodType: "VEG",
      });

      alert("Donation Created Successfully");

    } catch (err) {
      console.log(err);
    }
  };

  const totalDonations = donations.length;

  const activeDonations = donations.filter(
    (d) => d.status === "AVAILABLE"
  ).length;

  const deliveredDonations = donations.filter(
    (d) => d.status === "DELIVERED"
  ).length;

  const filteredDonations = donations.filter((d) => {

    if (selectedTab === "ACTIVE") {
      return d.status === "AVAILABLE";
    }

    if (selectedTab === "COMPLETED") {
      return d.status === "DELIVERED";
    }

    if (selectedTab === "DONATIONS") {
      return true;
    }

    return false;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}

      <div className="w-64 bg-white shadow-xl p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-green-600 mb-10">
          FoodShare
        </h1>

        <div className="space-y-4">

          {/* DASHBOARD */}

          <button
            onClick={() => {
              setSelectedTab("DASHBOARD");
              setSelectedDonation(null);
            }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "DASHBOARD"
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            <Package size={20} />
            Dashboard
          </button>

          {/* DONATIONS */}

          <button
            onClick={() => {
              setSelectedTab("DONATIONS");
              setSelectedDonation(null);
            }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "DONATIONS"
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            <UtensilsCrossed size={20} />
            Donations
          </button>

          {/* ACTIVE */}

          <button
            onClick={() => {
              setSelectedTab("ACTIVE");
              setSelectedDonation(null);
            }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "ACTIVE"
                ? "bg-yellow-500 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            <Clock3 size={20} />
            Active
          </button>

          {/* COMPLETED */}

          <button
            onClick={() => {
              setSelectedTab("COMPLETED");
              setSelectedDonation(null);
            }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "COMPLETED"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            <CheckCircle2 size={20} />
            Completed
          </button>

        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {/* DASHBOARD */}

        {selectedTab === "DASHBOARD" && (

          <>
            {/* TOP BAR */}

            <div className="flex justify-between items-center mb-8">

              <div>
                <h1 className="text-3xl font-bold">
                  Donor Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                  Manage your food donations efficiently
                </p>
              </div>

              <button
                onClick={() => {
                  createDonationRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:bg-green-700 transition"
              >
                <Plus size={18} />
                New Donation
              </button>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* TOTAL */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Total Donations
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {totalDonations}
                    </h2>
                  </div>

                  <div className="bg-green-100 p-4 rounded-xl">
                    <Package className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* ACTIVE */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Active Donations
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {activeDonations}
                    </h2>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-xl">
                    <Clock3 className="text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* DELIVERED */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Delivered
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {deliveredDonations}
                    </h2>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-xl">
                    <CheckCircle2 className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* CREATE DONATION */}

            <div
              ref={createDonationRef}
              className="bg-white rounded-2xl shadow-md p-8"
            >

              <h2 className="text-2xl font-semibold mb-6">
                Create Donation
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >

                <input
                  type="text"
                  name="foodName"
                  value={form.foodName}
                  onChange={handleChange}
                  placeholder="Food Name"
                  className="border border-gray-300 p-3 rounded-xl"
                />

                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="border border-gray-300 p-3 rounded-xl"
                />

                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={form.expiryTime}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl"
                />

                <input
                  type="number"
                  name="servesPeople"
                  value={form.servesPeople}
                  onChange={handleChange}
                  placeholder="Serves People"
                  className="border border-gray-300 p-3 rounded-xl"
                />

                <select
                  name="foodType"
                  value={form.foodType}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl"
                >
                  <option value="VEG">VEG</option>
                  <option value="NON_VEG">NON VEG</option>
                </select>

                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="border border-gray-300 p-3 rounded-xl md:col-span-2"
                />

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition shadow-md"
                >
                  Create Donation
                </button>

              </form>
            </div>
          </>
        )}

        {/* DONATIONS / ACTIVE / COMPLETED */}

        {(selectedTab === "DONATIONS" ||
          selectedTab === "ACTIVE" ||
          selectedTab === "COMPLETED") && (

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-3xl font-bold mb-8">

              {selectedTab === "DONATIONS" && "All Donations"}
              {selectedTab === "ACTIVE" && "Active Donations"}
              {selectedTab === "COMPLETED" && "Completed Donations"}

            </h2>

            <div className="space-y-4">

              {filteredDonations.map((d) => (

                <div
                  key={d.id}
                  onClick={() => setSelectedDonation(d)}
                  className="border rounded-2xl p-5 hover:bg-gray-50 cursor-pointer transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-semibold text-xl">
                        {d.foodName}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {d.quantity}
                      </p>

                    </div>

                    <span className={`
                      px-4 py-1 rounded-full text-sm font-medium
                      ${d.status === "AVAILABLE"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""}
                      ${d.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : ""}
                    `}>

                      {d.status}

                    </span>

                  </div>
                </div>

              ))}

            </div>

            {/* DONATION DETAILS */}

            {selectedDonation && (

              <div className="mt-10 border-t pt-8">

                <h2 className="text-2xl font-bold mb-6">
                  Donation Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <p className="text-gray-500 text-sm">
                      Food Name
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {selectedDonation.foodName}
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <p className="text-gray-500 text-sm">
                      Quantity
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {selectedDonation.quantity}
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <p className="text-gray-500 text-sm">
                      Food Type
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {selectedDonation.foodType}
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <p className="text-gray-500 text-sm">
                      Serves People
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {selectedDonation.servesPeople}
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl md:col-span-2">
                    <p className="text-gray-500 text-sm">
                      Description
                    </p>

                    <h3 className="text-lg font-medium mt-1">
                      {selectedDonation.description}
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <p className="text-gray-500 text-sm">
                      Status
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                      {selectedDonation.status}
                    </h3>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}