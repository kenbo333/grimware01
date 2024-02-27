import Navbar from "@/components/layout/Navbar";
import React from "react";
import SelectPurchase from "@/components/purchaseImport/SelectPurchase";

const PurchaseImport = () => {
  return (
    <div>
      <Navbar />

      <div className="bg-secondary" style={{ height: "47px" }}></div>

      <SelectPurchase />
    </div>
  );
};

export default PurchaseImport;
