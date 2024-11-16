import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 sm:px-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Welcome to BetterTripTravel, your number one source for all things travel.
          We’re dedicated to providing you the very best of tours, with an emphasis on quality, customer service, and uniqueness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-6">
            <img src="https://via.placeholder.com/300" alt="Our Mission" className="rounded-full w-32 h-32 mb-4"/>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-center">
              Our mission is to inspire wanderlust and provide unforgettable experiences for travelers around the world.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-6">
            <img src="https://via.placeholder.com/300" alt="Our Vision" className="rounded-full w-32 h-32 mb-4"/>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-center">
              We aim to become the leading travel provider by offering innovative, flexible, and sustainable travel options for all.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mb-4"/>
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            <div className="text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mb-4"/>
              <h3 className="font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Chief Operations Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
