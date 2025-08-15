import React from "react";

const About=()=>{
  return (
    <div className="py-16 bg-gray-50">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-2xl border-1 border-gray-300 overflow-hidden mx-auto max-w-6xl">
        
        {/* Left Side Image */}
        <div
          className="lg:w-1/2 bg-cover bg-center min-h-[300px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20164.jpg?t=st=1755154254~exp=1755157854~hmac=2a6d6ea1e2c56d389c9930ad2e43343936d384fb4567e49026ed6eb0e603df27&w=1480')"
          }}
        ></div>

        {/* Right Side Content */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At <span className="font-semibold text-gray-800">BrandName</span>, we believe business is about more than products — it’s about people.  
            Since day one, our mission has been to create meaningful solutions that simplify lives, inspire innovation, and make our customers smile.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Whether you’re a first-time visitor or a long-term client, our team is here to support you every step of the way.  
            We focus on quality, trust, and lasting relationships — because we know that’s what truly matters.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 text-center mt-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">10+</h3>
              <p className="text-sm text-gray-500">Years of Excellence</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-sm text-gray-500">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">24/7</h3>
              <p className="text-sm text-gray-500">Customer Support</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About