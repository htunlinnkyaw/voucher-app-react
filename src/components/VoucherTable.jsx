import React from "react";
import VoucherTableRow from "./VoucherTableRow";
import useRecordStore from "../stores/useRecordStore";

const VoucherTable = () => {
  const { records } = useRecordStore();

  const total = records.reduce((pv, cv) => pv + cv.cost, 0);
  const tax = total * 0.07;
  const netTotal = total + tax;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center" colSpan={5}>
                  There is no record.
                </td>
              </tr>
            )}
            {records.map((record, index) => (
              <VoucherTableRow key={record.id} record={record} index={index} />
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b">
              <td className="px-6 py-4 text-end font-bold" colSpan={4}>
                Total
              </td>
              <td className="px-6 py-4 text-end">{total.toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 text-end font-bold" colSpan={4}>
                Tax (Vat 7%)
              </td>
              <td className="px-6 py-4 text-end">{tax.toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 text-end font-bold" colSpan={4}>
                Net Total (THB)
              </td>
              <td className="px-6 py-4 text-end">{netTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default VoucherTable;
