import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';
import Carousel from './Carousel';
import PopularCategories from './PopularCategories';

const Home = () => {

    const { setSearch, user } = useContext(AuthContext)

    return (
        <>

        <Carousel/>

            {/* Card Section Dynamically */}
            <UserDashboard />


            <PopularCategories/>

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
