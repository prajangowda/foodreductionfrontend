import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-green-50">
        <h1 className="text-4xl font-bold mb-4">
          Reduce Food Waste, Feed Lives
        </h1>

        <p className="text-gray-600 mb-6">
          Connect donors, NGOs, and volunteers to distribute surplus food efficiently.
        </p>

        <div className="space-x-4">
          {!token ? (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 border rounded-lg"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-lg"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          <div className="p-6 shadow rounded">
            <h3 className="font-bold mb-2">Donors</h3>
            <p>Post surplus food easily</p>
          </div>

          <div className="p-6 shadow rounded">
            <h3 className="font-bold mb-2">NGOs</h3>
            <p>Find and request food nearby</p>
          </div>

          <div className="p-6 shadow rounded">
            <h3 className="font-bold mb-2">Volunteers</h3>
            <p>Deliver food to those in need</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold mb-10">
          Why Use FoodShare?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          <div className="p-6">⚡ Real-time food updates</div>
          <div className="p-6">📍 Location-based matching</div>
          <div className="p-6">🔐 Secure authentication</div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-2xl mb-4">
          Start Making a Difference Today
        </h2>

        {!token && (
          <Link
            to="/signup"
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Join Now
          </Link>
        )}
      </section>

    </div>
  );
}