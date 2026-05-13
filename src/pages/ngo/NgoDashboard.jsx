import { useEffect, useState } from "react";

import {
  Package,
  Clock3,
  CheckCircle2,
  UtensilsCrossed,
  Truck,
} from "lucide-react";

import {
  getNgoDonations,
  getMyNgoDonations,
  acceptDonation,
} from "../../services/ngoService";

export default function NgoDashboard() {

  const [selectedTab, setSelectedTab] = useState("DONATIONS");

  const [selectedDonation, setSelectedDonation] = useState(null);

  const [availableDonations, setAvailableDonations] = useState([]);

  const [myDonations, setMyDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {

    try {

      const available = await getNgoDonations();

      const mine = await getMyNgoDonations();

      setAvailableDonations(available);

      setMyDonations(mine);
     
    } catch (err) {

      console.log(err);
    }
  };

  const handleAcceptDonation = async (id) => {

    try {

      await acceptDonation(id);

      await fetchDonations();

      alert("Donation Accepted");

    } catch (err) {

      console.log(err);
    }
  };

  /* STATS */

  const allDonations = availableDonations;

  const activeDonations = myDonations.filter(
    (d) =>
      d.status === "ACCEPTED" ||
      d.status === "VOLUNTEER_ASSIGNED" ||
      d.status === "PICKED_UP"
  );

  const receivedDonations = myDonations.filter(
    (d) => d.status === "DELIVERED"
  );

  /* FILTERED DATA */

  const getFilteredDonations = () => {

    if (selectedTab === "DONATIONS") {
      return availableDonations;
      console.log("avilable",availableDonations)
    }

    if (selectedTab === "ACTIVE") {
      return activeDonations;
    }

    if (selectedTab === "RECEIVED") {
      return receivedDonations;
    }

    return [];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}

      <div className="w-64 bg-white shadow-xl p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-green-600 mb-10">
          FoodShare
        </h1>

        <div className="space-y-4">

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
            Active Accepted
          </button>

          {/* RECEIVED */}

          <button
            onClick={() => {
              setSelectedTab("RECEIVED");
              setSelectedDonation(null);
            }}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "RECEIVED"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            <CheckCircle2 size={20} />
            Received
          </button>

        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            NGO Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage food donations and volunteer deliveries
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TOTAL */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Available Donations
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {allDonations.length}
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
                  {activeDonations.length}
                </h2>

              </div>

              <div className="bg-yellow-100 p-4 rounded-xl">
                <Truck className="text-yellow-600" />
              </div>

            </div>
          </div>

          {/* RECEIVED */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Received Donations
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {receivedDonations.length}
                </h2>

              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                <CheckCircle2 className="text-blue-600" />
              </div>

            </div>
          </div>
        </div>

        {/* DONATIONS LIST */}

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-8">

            {selectedTab === "DONATIONS" &&
              "Available Donations"}

            {selectedTab === "ACTIVE" &&
              "Active Donations"}

            {selectedTab === "RECEIVED" &&
              "Received Donations"}

          </h2>

          <div className="space-y-4">

            {getFilteredDonations().map((d) => (

              <div
                key={d.id}
                onClick={() => setSelectedDonation(d)}
                className="border rounded-2xl p-5 hover:bg-gray-50 transition cursor-pointer"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-semibold">
                      {d.foodName}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Quantity: {d.quantity}
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    {/* ACCEPT BUTTON */}

                    {selectedTab === "DONATIONS" &&
                      d.status === "AVAILABLE" && (

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          handleAcceptDonation(d.id);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                      >
                        Accept
                      </button>
                    )}

                    {/* STATUS */}

                    <span className={`
                      px-4 py-1 rounded-full text-sm font-medium

                      ${d.status === "AVAILABLE"
                        ? "bg-gray-100 text-gray-700"
                        : ""}

                      ${d.status === "ACCEPTED"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""}

                      ${d.status === "VOLUNTEER_ASSIGNED"
                        ? "bg-blue-100 text-blue-700"
                        : ""}

                      ${d.status === "PICKED_UP"
                        ? "bg-orange-100 text-orange-700"
                        : ""}

                      ${d.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : ""}
                    `}>

                      {d.status}

                    </span>

                  </div>
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

                {/* FOOD */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Food Name
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    {selectedDonation.foodName}
                  </h3>

                </div>

                {/* QUANTITY */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Quantity
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    {selectedDonation.quantity}
                  </h3>

                </div>

                {/* TYPE */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Food Type
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    {selectedDonation.foodType}
                  </h3>

                </div>

                {/* SERVES */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Serves People
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    {selectedDonation.servesPeople}
                  </h3>

                </div>

                {/* STATUS */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Status
                  </p>

                  <h3 className="text-xl font-semibold mt-1">
                    {selectedDonation.status}
                  </h3>

                </div>

                {/* VOLUNTEER */}

                <div className="bg-gray-50 p-5 rounded-xl">

                  <p className="text-gray-500 text-sm">
                    Assigned Volunteer
                  </p>

                  <h3 className="text-xl font-semibold mt-1">

                    {selectedDonation.volunteer
                      ? selectedDonation.volunteer.name
                      : "Not Assigned"}

                  </h3>

                </div>

                {/* DESCRIPTION */}

                <div className="bg-gray-50 p-5 rounded-xl md:col-span-2">

                  <p className="text-gray-500 text-sm">
                    Description
                  </p>

                  <h3 className="text-lg font-medium mt-1">
                    {selectedDonation.description}
                  </h3>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}