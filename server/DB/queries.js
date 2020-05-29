const categories = () => {
    return `SELECT * FROM categories`;
  };

const productInfo = (productName) => {
  return `SELECT * FROM ${productName}`
}

const sendProductsToDb =  (id, product, date ) => {
  return `INSERT INTO public.bought_products(
    id, name, color, size, quantity, total_price, date)
    VALUES ('${id}', '${product.name}', '${product.color}', '20', '${product.quantity}', '${product.price}', '${date}');`
}

const sendInformationToDb = (id, information, date) => {
  return `INSERT INTO public.buyer_iformation(
    id, name, family_name, email, address, city, post_code, phone, date)
    VALUES ('${id}', '${information.name}', '${information.familyName}', '${information.email}', '${information.address}', '${information.city}', '${information.postalCode}', '${information.phone}','${date}');`
}

  module.exports = {
    categories,
    productInfo,
    sendProductsToDb,
    sendInformationToDb
  };