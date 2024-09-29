import React from "react";

const VoucherListEmpty = () => {
  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
        <td colSpan={5} className="px-6 py-4 text-center">
          There is no Voucher
        </td>
      </tr>
    </>
  );
};

export default VoucherListEmpty;
