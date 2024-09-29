import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { tailspin } from "ldrs";
import toast from "react-hot-toast";

tailspin.register();

const ProductCreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    // console.log(data);
    setIsSending(true);
    await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSending(false);
    reset();
    if (data.back_to_product_list) {
      navigate("/product");
    }
    toast.success("Product Created Successfully");
  };

  return (
    <div className="rounded-lg md:w-1/2 w-full ">
      <h1 className="text-3xl font-bold mb-2">Create New Product</h1>
      <p className="mb-5 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="mb-5">
          <label
            htmlFor="product-name"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.product_name && "text-red-500"
            }`}
          >
            New Product Name
          </label>
          <input
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            type="text"
            id="product-name"
            placeholder="e.g Hosting"
            className={`bg-gray-50 border ${
              errors.product_name
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {errors.product_name?.type === "required" && (
            <p className=" text-red-500 text-sm mt-1">
              Product name is required
            </p>
          )}
          {errors.product_name?.type === "minLength" && (
            <p className=" text-red-500 text-sm mt-1">
              Product name must be greater than 3 characters
            </p>
          )}
          {errors.product_name?.type === "manLength" && (
            <p className=" text-red-500 text-sm mt-1">
              Product name must be less than 30 characters
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="product-price"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.price && "text-red-500"
            }`}
          >
            Product Price
          </label>
          <input
            {...register("price", {
              required: true,
              min: 100,
              max: 10000,
            })}
            type="number"
            id="product-price"
            placeholder="e.g 1000"
            className={`bg-gray-50 border ${
              errors.price
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {errors.price?.type === "required" && (
            <p className=" text-red-500 text-sm mt-1">
              Product price is required
            </p>
          )}
          {errors.price?.type === "min" && (
            <p className=" text-red-500 text-sm mt-1">
              Product price must be greater than 100 characters
            </p>
          )}
          {errors.price?.type === "max" && (
            <p className=" text-red-500 text-sm mt-1">
              Product price must be less than 10000 characters
            </p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("all_correct")}
            id="check-one"
            required
            type="checkbox"
            value={true}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="check-one"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make sure all field are correct
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("back_to_product_list")}
            id="check-two"
            type="checkbox"
            value={true}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="check-two"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Back to Product List after saving
          </label>
        </div>

        <div className="mt-5">
          <Link
            to="/product"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span>Save Product</span>
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
      </form>
    </div>
  );
};

export default ProductCreateCard;
