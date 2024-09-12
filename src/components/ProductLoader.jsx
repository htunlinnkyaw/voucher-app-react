import React from "react";

const ProductLoader = () => {
  const numbers = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <>
      {numbers.map((el) => (
        <tr
          key={el}
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 animate-pulse"
        >
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-6"></div>
          </td>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
          >
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-24"></div>
          </th>
          <td className="px-6 py-4 text-end">
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-16 ml-auto"></div>
          </td>
          <td className="px-6 py-4 text-end">
            <div className="flex flex-col items-end">
              <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-20 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-14"></div>
            </div>
          </td>
          <td className="px-6 py-4 text-end">
            <div className="inline-flex space-x-2">
              <div className="h-8 w-8 bg-gray-300 rounded dark:bg-gray-600"></div>
              <div className="h-8 w-8 bg-gray-300 rounded dark:bg-gray-600"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductLoader;
