import React from 'react';

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
                        <h2 className="text-xl font-medium text-gray-600 mb-4">Page Not Found</h2>
                        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>

                        <div className="flex flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.history.back()}
                                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200"
                            >
                                Go Back
                            </button>
                            <a
                                href="/"
                                className="px-4 py-2 bg-blue-500 text-white text-decoration-none rounded-md hover:bg-blue-600 transition-colors duration-200"
                            >
                                <span className="text-white">Home</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};