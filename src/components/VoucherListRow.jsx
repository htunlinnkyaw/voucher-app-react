import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa6";
import ShowDate from "./ShowDate";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { bouncy } from "ldrs";
import { Link } from "react-router-dom";
bouncy.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const handleRemoveBtn = async () => {
    setIsDeleting(true);
    await fetch(`${import.meta.env.VITE_API_URL}/vouchers/${id}`, {
      method: "DELETE",
    });

    mutate(`${import.meta.env.VITE_API_URL}/vouchers`);

    setIsDeleting(false);

    toast.success("Voucher deleted successfully");
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{voucher_id}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
        >
          {customer_name}
        </th>
        <td className="px-6 py-4 ">{customer_email}</td>
        <td className="px-6 py-4 text-end">
          <ShowDate timestamp={sale_date} />
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link
              to={`/voucher/detail/${id}`}
              className="size-10 flex items-center justify-center text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <FaRegEye />
            </Link>
            <button
              onClick={handleRemoveBtn}
              type="button"
              className="size-10 flex items-center justify-center text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              {isDeleting ? (
                <l-bouncy size="20" speed="1.75" color="gray"></l-bouncy>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default VoucherListRow;
