import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import ProductEditCard from "../components/ProductEditCard";

const ProductEditPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Edit Product"}
          links={[{ title: "Product Module", path: "/product" }]}
        />
        <ProductEditCard />
      </Container>
    </section>
  );
};

export default ProductEditPage;
