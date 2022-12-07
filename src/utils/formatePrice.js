const formatPrice = (price) => {
    return price?.toFixed(4)?.replace(/0+$/, "");
  };
  
  export default formatPrice;