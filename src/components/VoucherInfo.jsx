import React, { useState } from "react";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import { useForm } from "react-hook-form";
import useRecordStore from "../stores/useRecordStore";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tailspin } from "ldrs";
tailspin.register();

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { records, resetRecord } = useRecordStore();
  const [isSending, setIsSending] = useState(false);

  const { mutate } = useSWRConfig();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    const total = records.reduce((pv, cv) => pv + cv.cost, 0);
    const tax = total * 0.07;
    const netTotal = total + tax;

    const currentVoucher = { ...data, records, total, tax, netTotal };

    setIsSending(true);

    await fetch(`${import.meta.env.VITE_API_URL}/vouchers`, {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate(`${import.meta.env.VITE_API_URL}/vouchers`);

    resetRecord();
    reset();

    setIsSending(false);

    toast.success("Voucher created successfully.");

    if (data.save_data) {
      nav("/voucher");
    }
  };

  const generateRandomInvoice = () => {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  };

  const dateTimeLocal =
    new Date().toISOString().slice(0, 10) +
    "T" +
    new Date().toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5);

  return (
    <div>
      <form id="infoForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-4 md:gap-6 mb-6">
          <div>
            <label
              htmlFor="voucher-id"
              className={`block mb-2 text-sm font-medium text-gray-900 ${
                errors.voucher_id && "text-red-500"
              }`}
            >
              Voucher ID
            </label>
            <input
              {...register("voucher_id", {
                required: true,
                minLength: 17,
                maxLength: 17,
              })}
              type="text"
              id="voucher-id"
              defaultValue={generateRandomInvoice()}
              className={`bg-gray-50 border ${
                errors.voucher_id
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {errors.voucher_id?.type === "required" && (
              <p className=" text-red-500 text-sm mt-1">
                Voucher id is required
              </p>
            )}
            {errors.voucher_id?.type === "minLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Voucher id must be at least 17 characters
              </p>
            )}
            {errors.voucher_id?.type === "maxLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Voucher id must be less than 17 characters
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="customer-name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Customer Name
            </label>
            <input
              {...register("customer_name")}
              type="text"
              id="customer-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="customer-email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Customer Email
            </label>
            <input
              {...register("customer_email")}
              type="email"
              id="customer-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="sale-date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sale Date
            </label>
            <div className="relative">
              <input
                {...register("sale_date")}
                type="datetime-local"
                id="sale-date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={dateTimeLocal}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>

      <SaleForm />
      <VoucherTable />

      <div className="flex items-center justify-end space-x-4">
        <div className="flex items-center">
          <input
            {...register("all_correct")}
            id="make-sure"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="make-sure"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Make sure all field are correct
          </label>
        </div>
        <div className="flex items-center">
          <input
            {...register("save_data")}
            id="view-vouchers"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="view-vouchers"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            View vouchers after saving
          </label>
        </div>
        <button
          form="infoForm"
          type="submit"
          className="text-white flex items-center gap-2 justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          <span> Confrim Voucher</span>
          {isSending && (
            <l-tailspin
              size="20"
              stroke="5"
              speed="0.9"
              color="white"
            ></l-tailspin>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoucherInfo;
