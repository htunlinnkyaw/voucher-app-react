import React from "react";

const InvoiceDetailLoader = () => {
  return (
    <>
      <section>
        <div className="max-w-3xl p-8 bg-gray-50 shadow animate-pulse rounded-lg">
          <div className="flex justify-between mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="flex justify-between mb-8">
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col space-y-2 text-right">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center space-x-4"
                >
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded text-end"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded text-right"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded text-right"></div>
                </div>
              ))}
          </div>

          <div className="flex justify-end space-y-2 text-right">
            <div className="flex flex-col space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-36 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceDetailLoader;
