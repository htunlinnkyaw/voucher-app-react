import { useParams } from "react-router-dom";
import { FiDownload, FiPrinter } from "react-icons/fi";
import useSWR from "swr";
import InvoiceDetailLoader from "./InvoiceDetailLoader";
import printJS from "print-js";
import html2pdf from "html2pdf.js";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherDetailCard = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/vouchers/${id}`,
    fetcher
  );

  const handlePrint = () => {
    printJS({
      printable: "printArea",
      type: "html",
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };

  const handlePdf = () => {
    console.log("export pdf");
    const element = document.getElementById("printArea");

    html2pdf()
      .set({
        margin: 0.1,
        filename: `invoice_${id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a5", orientation: "portrait" }, // Changed format to A5
      })
      .from(element)
      .save();
  };

  // Fix: Correctly format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <InvoiceDetailLoader />;
  }

  if (error) {
    return <p>Error loading voucher details.</p>;
  }

  return (
    <div className="flex  gap-5">
      <div id="printArea" className="w-[14.8cm] bg-white print:p-10 p-3 border">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">INVOICE</h1>
            <p className="text-sm">{data.voucher_id}</p>
          </div>
          <div>
            <p className="font-bold">Invoice To</p>
            <p className="text-sm font-normal">{data.customer_name}</p>
            <p className="print:text-[10px]">
              Date - {formatDate(data.sale_date)}
            </p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 text-sm">No</th>
              <th className="text-left py-2 text-sm">Description</th>
              <th className="text-right py-2 text-sm">Qty</th>
              <th className="text-right py-2 text-sm">Price</th>
              <th className="text-right py-2 text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((record, index) => (
              <tr key={record.id} className="border-b border-gray-200">
                <td className="py-2 text-sm">{index + 1}</td>
                <td className="py-2 text-sm">{record.product.product_name}</td>
                <td className="text-right py-2 text-sm">{record.quantity}</td>
                <td className="text-right py-2 text-sm">
                  {record.product.price}
                </td>
                <td className="text-right py-2 text-sm">{record.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Total
              </td>
              <td className="py-2 text-right text-sm">
                {data.total.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Tax
              </td>
              <td className="py-2 text-right text-sm">{data.tax.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-right text-sm" colSpan={4}>
                Net Total
              </td>
              <td className="py-2 text-right text-sm">
                {data.netTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-xs mb-8">
          <div>
            <h2 className="font-bold mb-2">Payment Transfer to</h2>
            <p>Kpay,Wave - 09250152018</p>
            <p>KBZ Bank - 02730102705025601</p>
            <p>AYA Bank - 20003674121</p>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl">MMS IT</h2>
            <p>48, 1st Floor, Shan Kone St.</p>
            <p>+959-250-152-018</p>
            <p>enquiry@mms-it.com</p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-4">
          <p className="mt-4 text-center text-sm">Thanks to You</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:ring-blue-700"
        >
          <span className="text-sm">Print Voucher</span> <FiPrinter />
        </button>

        <button
          onClick={handlePdf}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:ring-blue-700"
        >
          <span className="text-sm">Download PDF</span> <FiDownload />
        </button>
      </div>
    </div>
  );
};

export default VoucherDetailCard;
