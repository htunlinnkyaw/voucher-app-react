import { useParams } from "react-router-dom";
import eSign from "../assets/sign.png";
import { FiPrinter } from "react-icons/fi";
import useSWR from "swr";
import InvoiceDetailLoader from "./InvoiceDetailLoader";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherDetailCard = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/vouchers/${id}`,
    fetcher
  );

  const handlePrint = () => {
    print();
  };

  return (
    <>
      <div className="my-5 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:ring-blue-700"
        >
          <span>Print Invoice</span> <FiPrinter />
        </button>
      </div>
      {isLoading ? (
        <InvoiceDetailLoader />
      ) : (
        <section>
          <div className="max-w-3xl  p-8 bg-gray-50 print:bg-white print:shadow-none  shadow">
            <div className="flex justify-between mb-8">
              <div className="text-right">
                <h2 className="text-xl font-bold">MMS INVOICE</h2>
              </div>
              <div className="text-right">
                <p>
                  <span className="font-bold">Sale Date:</span>{" "}
                  {data?.sale_date}
                </p>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <div>
                <span className="font-bold mr-2">Bill To:</span>
                <span>{data?.customer_name}</span>
              </div>
              <div>
                <p>
                  <span className="font-bold">Invoice ID:</span>{" "}
                  {data?.voucher_id}
                </p>
              </div>
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">DESCRIPTION</th>
                  <th className="text-end py-2">QTY</th>
                  <th className="text-right py-2">UNIT PRICE</th>
                  <th className="text-right py-2">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {data?.records.map((el) => (
                  <tr key={el.id}>
                    <td className="py-2">{el.product.product_name}</td>
                    <td className="py-2 text-end">{el.quantity}</td>
                    <td className="text-right py-2">{el.product.price}</td>
                    <td className="text-right py-2">{el.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end my-10">
              <div className="text-right">
                <p className="mb-2">Total: $ {data?.total.toFixed(2)}</p>
                <p className="mb-2">Tax (Vat 7%): ${data?.tax.toFixed(2)}</p>
                <p className="font-bold text-xl">
                  Net Total: ${data?.netTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default VoucherDetailCard;
