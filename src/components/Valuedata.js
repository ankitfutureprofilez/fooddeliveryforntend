import React from 'react';

export const formatMultiPrice = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const Valuedata = () => {
  return (
    <div>
    </div>
  );
}

export default Valuedata;
