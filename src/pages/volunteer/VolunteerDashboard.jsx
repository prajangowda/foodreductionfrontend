import { useEffect, useState } from "react";

import {
    Truck,
    CheckCircle2,
    Clock3,
    Package,
    Eye,
    UserCheck,
} from "lucide-react";

import axios from "axios";

export default function VolunteerDashboard() {

    const [assignedDonations, setAssignedDonations] = useState([]);
    const [completedDonations, setCompletedDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);

    const [selectedTab, setSelectedTab] = useState("DASHBOARD");

    const [available, setAvailable] = useState(false);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetchAssignedDonations();
        fetchCompletedDonations();
    }, []);

    // FETCH ASSIGNED

    const fetchAssignedDonations = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/volunteer/assigned",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data)
            setAssignedDonations(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    // FETCH COMPLETED

    const fetchCompletedDonations = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/volunteer/completed",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCompletedDonations(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    // TOGGLE AVAILABILITY

    const toggleAvailability = async () => {

        try {

            const newValue = !available;

            await axios.put(
                `http://localhost:8080/volunteer/availability?available=${newValue}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAvailable(newValue);

        } catch (err) {
            console.log(err);
        }
    };

    // VIEW DETAILS

    const viewDonationDetails = async (id) => {

        try {

            const res = await axios.get(
                `http://localhost:8080/volunteer/donation/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedDonation(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    // PICKUP

    const markPickedUp = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/volunteer/pickup/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAssignedDonations();

        } catch (err) {
            console.log(err);
        }
    };

    // COMPLETE

    const markCompleted = async (id) => {

        try {

            await axios.put(
                `http://localhost:8080/volunteer/complete/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchAssignedDonations();
            fetchCompletedDonations();

        } catch (err) {
            console.log(err);
        }
    };

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

                    {/* ASSIGNED */}

                    <button
                        onClick={() => {
                            setSelectedTab("ASSIGNED");
                            setSelectedDonation(null);
                        }}
                        className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition
              ${selectedTab === "ASSIGNED"
                                ? "bg-yellow-500 text-white"
                                : "hover:bg-gray-100"}
            `}
                    >
                        <Clock3 size={20} />
                        Assigned
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
                                    Volunteer Dashboard
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    Manage pickups and deliveries
                                </p>

                            </div>

                            <button
                                onClick={toggleAvailability}
                                className={`
                  px-5 py-3 rounded-xl text-white font-medium shadow-lg transition
                  ${available
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-500 hover:bg-red-600"}
                `}
                            >
                                {available ? "AVAILABLE" : "NOT AVAILABLE"}
                            </button>

                        </div>

                        {/* STATS */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                            {/* ASSIGNED */}

                            <div className="bg-white rounded-2xl shadow-md p-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">
                                            Assigned Donations
                                        </p>

                                        <h2 className="text-4xl font-bold mt-2">
                                            {assignedDonations.length}
                                        </h2>

                                    </div>

                                    <div className="bg-yellow-100 p-4 rounded-xl">
                                        <Clock3 className="text-yellow-600" />
                                    </div>

                                </div>

                            </div>

                            {/* COMPLETED */}

                            <div className="bg-white rounded-2xl shadow-md p-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">
                                            Completed Deliveries
                                        </p>

                                        <h2 className="text-4xl font-bold mt-2">
                                            {completedDonations.length}
                                        </h2>

                                    </div>

                                    <div className="bg-green-100 p-4 rounded-xl">
                                        <CheckCircle2 className="text-green-600" />
                                    </div>

                                </div>

                            </div>

                            {/* STATUS */}

                            <div className="bg-white rounded-2xl shadow-md p-6">

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">
                                            Volunteer Status
                                        </p>

                                        <h2 className="text-2xl font-bold mt-2">
                                            {available ? "Online" : "Offline"}
                                        </h2>

                                    </div>

                                    <div className="bg-blue-100 p-4 rounded-xl">
                                        <UserCheck className="text-blue-600" />
                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )}

                {/* ASSIGNED TAB */}

                {selectedTab === "ASSIGNED" && (

                    <div className="bg-white rounded-2xl shadow-md p-8">

                        <h2 className="text-3xl font-bold mb-8">
                            Assigned Donations
                        </h2>

                        <div className="space-y-4">

                            {assignedDonations.map((d) => (

                                <div
                                    key={d.id}
                                    className="border rounded-2xl p-5"
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

                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                                            {d.status}
                                        </span>

                                    </div>

                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() => viewDonationDetails(d.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                        >
                                            <Eye size={18} />
                                            View
                                        </button>

                                        <button
                                            onClick={() => markPickedUp(d.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                        >
                                            <Truck size={18} />
                                            Picked Up
                                        </button>

                                        <button
                                            onClick={() => markCompleted(d.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={18} />
                                            Complete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </div>
                )}

                {/* COMPLETED TAB */}

                {selectedTab === "COMPLETED" && (

                    <div className="bg-white rounded-2xl shadow-md p-8">

                        <h2 className="text-3xl font-bold mb-8">
                            Completed Deliveries
                        </h2>

                        <div className="space-y-4">

                            {completedDonations.map((d) => (

                                <div
                                    key={d.id}
                                    className="border rounded-2xl p-5"
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

                                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                                            {d.status}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </div>
                )}

                {/* DETAILS */}

                {selectedDonation && (

                    <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

                        <div className="flex justify-between items-center mb-6">

                            {/* FOOD NAME AS HEADING */}

                            <h2 className="text-3xl font-bold">
                                {selectedDonation.foodName}
                            </h2>

                            {/* CLOSE BUTTON */}

                            <button
                                onClick={() => setSelectedDonation(null)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                            >
                                Close
                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* FOOD TYPE */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    Food Type
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {selectedDonation.foodType}
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

                            {/* DONOR NAME */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    Donor Name
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {selectedDonation.donorName}
                                </h3>

                            </div>

                            {/* NGO NAME */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    NGO Name
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {selectedDonation.ngoName}
                                </h3>

                            </div>

                            {/* DONOR ADDRESS */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    Donor Address
                                </p>

                                <h3 className="text-lg font-medium mt-1">
                                    {selectedDonation.donorAddress}
                                </h3>

                            </div>

                            {/* NGO ADDRESS */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    NGO Address
                                </p>

                                <h3 className="text-lg font-medium mt-1">
                                    {selectedDonation.deliveryAddress}
                                </h3>

                            </div>

                            {/* DONOR PHONE */}

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <p className="text-gray-500 text-sm">
                                    Donor Phone
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    {selectedDonation.donorPhone}
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

                        </div>

                        {/* IMAGE */}

                        {selectedDonation.imageUrl && (

                            <img
                                src={selectedDonation.imageUrl}
                                alt="Donation"
                                className="rounded-2xl mt-8 w-96 shadow-lg"
                            />

                        )}

                    </div>
                )}

            </div>
        </div>
    );
}