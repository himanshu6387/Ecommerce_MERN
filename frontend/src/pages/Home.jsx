import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';

const Home = () => {

    const { setSearch, user } = useContext(AuthContext)

    return (
        <>
            {/* Hero Section */}
            <section className="text-center py-10 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <span className="inline-block px-3 py-1 mb-4 text-red-500 border border-red-500 rounded-full text-sm font-medium">
                        No. 1 Online Shopping Platform
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 mt-4">
                        Search, Buy & Enjoy Your <span className="text-blue-600">Favorite Products</span>
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Discover a wide range of products at unbeatable prices.
                        <br />
                        Shop securely and get them delivered to your doorstep.
                    </p>

                    {/* Search Box */}
                    <div className="flex justify-center mb-6">
                        <div className="flex w-full max-w-xl rounded-full overflow-hidden shadow">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-grow px-5 py-3 outline-none"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="bg-blue-600 text-white px-5 flex items-center justify-center">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* Product Categories */}
                    <div className="flex justify-center flex-wrap gap-3 mb-8">
                        <span className="px-5 py-2 border border-gray-400 text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                            Electronics
                        </span>
                        <span className="px-5 py-2 border border-gray-400 text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                            Fashion
                        </span>
                        <span className="px-5 py-2 border border-gray-400 text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                            Home & Kitchen
                        </span>
                    </div>

                    {/* Login Buttons */}
                    {
                        !user ?
                            <>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        to="/login"
                                        className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
                                    >
                                        Login as Customer
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50"
                                    >
                                        Login as Seller
                                    </Link>
                                </div>
                            </> :
                            <>
                            </>
                    }
                </div>
            </section>

            {/* Card Section Dynamically */}
            <UserDashboard />

            {/* Why Us Section */}
            <main className="mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <section className="mb-10 text-center">
                        <h2 className="text-2xl font-bold mb-3">Why Shop With Us?</h2>
                        <p className="text-gray-600 mb-8">
                            We provide high-quality products with fast delivery and excellent customer service.
                        </p>

                        <div className="grid gap-13 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="bg-white rounded-xl shadow-2xl border-1 border-gray-300 hover:shadow-lg transition p-4 flex flex-col items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/839/839860.png"
                                    alt="Wide Variety"
                                    className="h-40 object-contain mb-4"
                                />
                                <h5 className="font-semibold">Wide Variety</h5>
                                <p className="text-gray-500 text-sm mt-2">
                                    Choose from thousands of products across multiple categories.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-xl shadow hover:shadow-lg border-1 border-gray-300 transition p-4 flex flex-col items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2942/2942076.png"
                                    alt="Fast Delivery"
                                    className="h-40 object-contain mb-4"
                                />
                                <h5 className="font-semibold">Fast Delivery</h5>
                                <p className="text-gray-500 text-sm mt-2">
                                    Get your orders delivered to your doorstep quickly.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-xl shadow hover:shadow-lg border-1 border-gray-300 transition p-4 flex flex-col items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
                                    alt="Secure Payment"
                                    className="h-40 object-contain mb-4"
                                />
                                <h5 className="font-semibold">Secure Payment</h5>
                                <p className="text-gray-500 text-sm mt-2">
                                    Pay with confidence using secure and trusted payment methods.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
