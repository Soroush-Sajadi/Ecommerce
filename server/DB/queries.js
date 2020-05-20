const categories = () => {
    return `SELECT * FROM categories`;
  };

const productInfo = (productName) => {
  return `SELECT * FROM ${productName}`
}



  module.exports = {
    categories,
    productInfo,
  };