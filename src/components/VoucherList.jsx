import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import VoucherListRow from "./VoucherListRow";
import VoucherListLoader from "./VoucherListLoader";
import useSWR from "swr";
import VoucherListEmpty from "./VoucherListEmpty";
import { debounce } from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {
  const [search, setSearch] = useState();

  const searchInput = useRef();

  const { data, isLoading, error } = useSWR(
    search
      ? `${import.meta.env.VITE_API_URL}/vouchers?voucher_id_like=${search}`
      : `${import.meta.env.VITE_API_URL}/vouchers`,
    fetcher
  );

  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }, 500);

  const handleClearSearch = () => {
    searchInput.current.value = null;
  };

  return (
    <div>
      <div className=" flex justify-between mb-3">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
              ref={searchInput}
              onChange={handleSearch}
              type="text"
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Voucher"
            />
            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-0 bottom-0 m-auto"
              >
                <HiX fill="gray" className="active:scale-90 duration-200" />
              </button>
            )}
          </div>
        </div>
        <div className="">
          <Link
            to={"/sale"}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiComputerDesktop />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Invoice ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>

              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <VoucherListLoader />
            ) : data.length === 0 ? (
              <VoucherListEmpty />
            ) : (
              data?.map((voucher, index) => (
                <VoucherListRow
                  key={voucher.id}
                  index={index}
                  voucher={voucher}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
