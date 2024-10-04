import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../stores/useRecordStore";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SaleForm = () => {
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/products`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addRecord, records, changeQuantity } = useRecordStore();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);
    const currentProductId = currentProduct.id;

    const isExisted = records.find(
      ({ product: { id } }) => currentProductId === id
    );

    if (isExisted) {
      changeQuantity(isExisted.id, data.quantity);
    } else {
      const newRecord = {
        id: Date.now(),
        product: currentProduct,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      };
      addRecord(newRecord);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-200 rounded-md p-5 bg-white mb-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-5 mb-6">
        <div className="col-span-2">
          <label
            htmlFor="product"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.product && "text-red-500"
            }`}
          >
            Select Your option
          </label>
          <select
            {...register("product", {
              required: true,
            })}
            id="product"
            className={`bg-gray-50 border ${
              errors.product
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          >
            <option value="">Choose a product</option>
            {!isLoading &&
              data.map((product) => (
                <option key={product.id} value={JSON.stringify(product)}>
                  {product.product_name}
                </option>
              ))}
          </select>
          {errors.product?.type === "required" && (
            <p className=" text-red-500 text-sm mt-1">
              Product field is required
            </p>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="quantity"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.quantity && "text-red-500"
            }`}
          >
            Quantity
          </label>
          <input
            {...register("quantity", {
              required: true,
            })}
            type="number"
            id="quantity"
            className={`bg-gray-50 border ${
              errors.quantity
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {errors.quantity?.type === "required" && (
            <p className=" text-red-500 text-sm mt-1">
              Quantity field is required
            </p>
          )}
        </div>
        <div className="col-span-1 mt-5 md:mt-0">
          <button
            type="submit"
            className="text-blue-700 px-4 py-2  hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full h-full text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
