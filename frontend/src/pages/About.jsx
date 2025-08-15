import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About <span className="text-purple-600">Gifty</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We craft products and experiences that make life simpler, smarter, and more enjoyable.  
            Our passion is turning bold ideas into solutions that inspire and connect people.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="relative">
            <img
              src="https://img.freepik.com/free-photo/business-team-working-together-office_1303-18960.jpg"
              alt="Our Team"
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold">10+</h3>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded with a vision to make quality accessible to everyone, <strong>BrandName</strong> has grown into a trusted name in our industry.  
              We combine innovation with care, ensuring that every product we deliver meets the highest standards.
            </p>
            <p className="text-gray-600 mb-6">
              Our team works tirelessly to understand your needs, adapt to changing trends, and stay ahead with creative solutions.  
              Whether you're a first-time customer or a long-time partner, we aim to make every interaction exceptional.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <h4 className="text-2xl font-bold text-purple-600">500+</h4>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <h4 className="text-2xl font-bold text-purple-600">50+</h4>
                <p className="text-sm text-gray-500">Dedicated Experts</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <h4 className="text-2xl font-bold text-purple-600">24/7</h4>
                <p className="text-sm text-gray-500">Support Availability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Quality First</h4>
            <p className="text-gray-600 text-sm">
              Every product is crafted with attention to detail and tested for excellence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Innovation Driven</h4>
            <p className="text-gray-600 text-sm">
              We constantly explore new ideas to bring fresh solutions to our customers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">People Focused</h4>
            <p className="text-gray-600 text-sm">
              Building strong, lasting relationships is at the heart of what we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
