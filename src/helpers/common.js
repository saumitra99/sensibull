const capitalizeFirstLetter = (string) =>
  string?.charAt(0)?.toUpperCase() + string?.slice(1);

export const PriceFormat = (price) =>
  price?.toLocaleString("en-IN", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
    style: "currency",
    currency: "INR",
  });

export default capitalizeFirstLetter;
