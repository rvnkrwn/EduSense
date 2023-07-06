import React from "react";

export default function Welcome() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm bg-white rounded shadow p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to EduSense</h1>
        <p className="text-gray-700 mb-6">
          Start your educational journey with us and explore a world of
          knowledge!
        </p>
        
        <p className="text-center text-gray-600 text-xs mt-4">
          &copy; {new Date().getFullYear()} EduSense. All rights reserved.
        </p>
      </div>
    </div>
  );
}
