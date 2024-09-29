import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import VoucherDetailCard from "../components/VoucherDetailCard";

const VoucherPageDetail = () => {
  return (
    <div>
      <Container>
        <Breadcrumb
          currentPageTitle={"Voucher Detail"}
          links={[{ title: "Voucher Page", path: "/voucher" }]}
        />
        <VoucherDetailCard />
      </Container>
    </div>
  );
};

export default VoucherPageDetail;
