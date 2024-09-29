import React from "react";

const ProductEditLoader = () => {
  return (
    <>
      <div className="rounded-lg md:w-1/2 w-full p-6 bg-white ">
        {/* Title Skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>

        {/* Description Skeleton */}
        <div className="h-4 w-full bg-gray-200 rounded mb-5 animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-5 animate-pulse"></div>

        <form>
          {/* Product Name Skeleton */}
          <div className="mb-5">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>

          {/* Product Price Skeleton */}
          <div className="mb-5">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>

          {/* Checkbox Skeletons */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex space-x-4 mt-5">
            <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEditLoader;
