import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useShop } from "../shopContext";
import axios from "axios";

// Mock product data (in a real app, this would come from the cart or previous page)
const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 249.99,
  image: "/placeholder.svg?height=200&width=200",
  quantity: 2,
};

export default function OrderPage() {
  const [formData, setFormData] = useState({
    town: "",
    city: "",
    zip: null,
    state: "",
    country: "",
    payment_method: "",
    total_amount: null,
    products: [
      {
        productId: "",
        quantity: null,
      },
    ],
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const [orderedItems, setOrderedItems] = useState([]);
  const { cart, path ,userId} = useShop();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.productId.product_price * item.productQuantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const totalPrice = subtotal + tax;
  const contries = [
    { name: "Afghanistan", shortform: "AF" },
    { name: "Albania", shortform: "AL" },
    { name: "Algeria", shortform: "DZ" },
    { name: "Andorra", shortform: "AD" },
    { name: "Angola", shortform: "AO" },
    { name: "Antigua and Barbuda", shortform: "AG" },
    { name: "Argentina", shortform: "AR" },
    { name: "Armenia", shortform: "AM" },
    { name: "Australia", shortform: "AU" },
    { name: "Austria", shortform: "AT" },
    { name: "Azerbaijan", shortform: "AZ" },
    { name: "Bahamas", shortform: "BS" },
    { name: "Bahrain", shortform: "BH" },
    { name: "Bangladesh", shortform: "BD" },
    { name: "Barbados", shortform: "BB" },
    { name: "Belarus", shortform: "BY" },
    { name: "Belgium", shortform: "BE" },
    { name: "Belize", shortform: "BZ" },
    { name: "Benin", shortform: "BJ" },
    { name: "Bhutan", shortform: "BT" },
    { name: "Bolivia", shortform: "BO" },
    { name: "Bosnia and Herzegovina", shortform: "BA" },
    { name: "Botswana", shortform: "BW" },
    { name: "Brazil", shortform: "BR" },
    { name: "Brunei", shortform: "BN" },
    { name: "Bulgaria", shortform: "BG" },
    { name: "Burkina Faso", shortform: "BF" },
    { name: "Burundi", shortform: "BI" },
    { name: "Cabo Verde", shortform: "CV" },
    { name: "Cambodia", shortform: "KH" },
    { name: "Cameroon", shortform: "CM" },
    { name: "Canada", shortform: "CA" },
    { name: "Central African Republic", shortform: "CF" },
    { name: "Chad", shortform: "TD" },
    { name: "Chile", shortform: "CL" },
    { name: "China", shortform: "CN" },
    { name: "Colombia", shortform: "CO" },
    { name: "Comoros", shortform: "KM" },
    { name: "Congo (Congo-Brazzaville)", shortform: "CG" },
    { name: "Costa Rica", shortform: "CR" },
    { name: "Croatia", shortform: "HR" },
    { name: "Cuba", shortform: "CU" },
    { name: "Cyprus", shortform: "CY" },
    { name: "Czech Republic", shortform: "CZ" },
    { name: "Denmark", shortform: "DK" },
    { name: "Djibouti", shortform: "DJ" },
    { name: "Dominica", shortform: "DM" },
    { name: "Dominican Republic", shortform: "DO" },
    { name: "Ecuador", shortform: "EC" },
    { name: "Egypt", shortform: "EG" },
    { name: "El Salvador", shortform: "SV" },
    { name: "Equatorial Guinea", shortform: "GQ" },
    { name: "Eritrea", shortform: "ER" },
    { name: "Estonia", shortform: "EE" },
    { name: "Eswatini", shortform: "SZ" },
    { name: "Ethiopia", shortform: "ET" },
    { name: "Fiji", shortform: "FJ" },
    { name: "Finland", shortform: "FI" },
    { name: "France", shortform: "FR" },
    { name: "Gabon", shortform: "GA" },
    { name: "Gambia", shortform: "GM" },
    { name: "Georgia", shortform: "GE" },
    { name: "Germany", shortform: "DE" },
    { name: "Ghana", shortform: "GH" },
    { name: "Greece", shortform: "GR" },
    { name: "Grenada", shortform: "GD" },
    { name: "Guatemala", shortform: "GT" },
    { name: "Guinea", shortform: "GN" },
    { name: "Guinea-Bissau", shortform: "GW" },
    { name: "Guyana", shortform: "GY" },
    { name: "Haiti", shortform: "HT" },
    { name: "Honduras", shortform: "HN" },
    { name: "Hungary", shortform: "HU" },
    { name: "Iceland", shortform: "IS" },
    { name: "India", shortform: "IN" },
    { name: "Indonesia", shortform: "ID" },
    { name: "Iran", shortform: "IR" },
    { name: "Iraq", shortform: "IQ" },
    { name: "Ireland", shortform: "IE" },
    { name: "Israel", shortform: "IL" },
    { name: "Italy", shortform: "IT" },
    { name: "Jamaica", shortform: "JM" },
    { name: "Japan", shortform: "JP" },
    { name: "Jordan", shortform: "JO" },
    { name: "Kazakhstan", shortform: "KZ" },
    { name: "Kenya", shortform: "KE" },
    { name: "Kiribati", shortform: "KI" },
    { name: "Korea (North)", shortform: "KP" },
    { name: "Korea (South)", shortform: "KR" },
    { name: "Kuwait", shortform: "KW" },
    { name: "Kyrgyzstan", shortform: "KG" },
    { name: "Laos", shortform: "LA" },
    { name: "Latvia", shortform: "LV" },
    { name: "Lebanon", shortform: "LB" },
    { name: "Lesotho", shortform: "LS" },
    { name: "Liberia", shortform: "LR" },
    { name: "Libya", shortform: "LY" },
    { name: "Liechtenstein", shortform: "LI" },
    { name: "Lithuania", shortform: "LT" },
    { name: "Luxembourg", shortform: "LU" },
    { name: "Madagascar", shortform: "MG" },
    { name: "Malawi", shortform: "MW" },
    { name: "Malaysia", shortform: "MY" },
    { name: "Maldives", shortform: "MV" },
    { name: "Mali", shortform: "ML" },
    { name: "Malta", shortform: "MT" },
    { name: "Marshall Islands", shortform: "MH" },
    { name: "Mauritania", shortform: "MR" },
    { name: "Mauritius", shortform: "MU" },
    { name: "Mexico", shortform: "MX" },
    { name: "Micronesia", shortform: "FM" },
    { name: "Moldova", shortform: "MD" },
    { name: "Monaco", shortform: "MC" },
    { name: "Mongolia", shortform: "MN" },
    { name: "Montenegro", shortform: "ME" },
    { name: "Morocco", shortform: "MA" },
    { name: "Mozambique", shortform: "MZ" },
    { name: "Myanmar", shortform: "MM" },
    { name: "Namibia", shortform: "NA" },
    { name: "Nauru", shortform: "NR" },
    { name: "Nepal", shortform: "NP" },
    { name: "Netherlands", shortform: "NL" },
    { name: "New Zealand", shortform: "NZ" },
    { name: "Nicaragua", shortform: "NI" },
    { name: "Niger", shortform: "NE" },
    { name: "Nigeria", shortform: "NG" },
    { name: "North Macedonia", shortform: "MK" },
    { name: "Norway", shortform: "NO" },
    { name: "Oman", shortform: "OM" },
    { name: "Pakistan", shortform: "PK" },
    { name: "Palau", shortform: "PW" },
    { name: "Panama", shortform: "PA" },
    { name: "Papua New Guinea", shortform: "PG" },
    { name: "Paraguay", shortform: "PY" },
    { name: "Peru", shortform: "PE" },
    { name: "Philippines", shortform: "PH" },
    { name: "Poland", shortform: "PL" },
    { name: "Portugal", shortform: "PT" },
    { name: "Qatar", shortform: "QA" },
    { name: "Romania", shortform: "RO" },
    { name: "Russia", shortform: "RU" },
    { name: "Rwanda", shortform: "RW" },
    { name: "Saint Kitts and Nevis", shortform: "KN" },
    { name: "Saint Lucia", shortform: "LC" },
    { name: "Saint Vincent and the Grenadines", shortform: "VC" },
    { name: "Samoa", shortform: "WS" },
    { name: "San Marino", shortform: "SM" },
    { name: "Sao Tome and Principe", shortform: "ST" },
    { name: "Saudi Arabia", shortform: "SA" },
    { name: "Senegal", shortform: "SN" },
    { name: "Serbia", shortform: "RS" },
    { name: "Seychelles", shortform: "SC" },
    { name: "Sierra Leone", shortform: "SL" },
    { name: "Singapore", shortform: "SG" },
    { name: "Slovakia", shortform: "SK" },
    { name: "Slovenia", shortform: "SI" },
    { name: "Solomon Islands", shortform: "SB" },
    { name: "Somalia", shortform: "SO" },
    { name: "South Africa", shortform: "ZA" },
    { name: "South Korea", shortform: "KR" },
    { name: "South Sudan", shortform: "SS" },
    { name: "Spain", shortform: "ES" },
    { name: "Sri Lanka", shortform: "LK" },
    { name: "Sudan", shortform: "SD" },
    { name: "Suriname", shortform: "SR" },
    { name: "Sweden", shortform: "SE" },
    { name: "Switzerland", shortform: "CH" },
    { name: "Syria", shortform: "SY" },
    { name: "Tajikistan", shortform: "TJ" },
    { name: "Tanzania", shortform: "TZ" },
    { name: "Thailand", shortform: "TH" },
    { name: "Timor-Leste", shortform: "TL" },
    { name: "Togo", shortform: "TG" },
    { name: "Tonga", shortform: "TO" },
    { name: "Trinidad and Tobago", shortform: "TT" },
    { name: "Tunisia", shortform: "TN" },
    { name: "Turkey", shortform: "TR" },
    { name: "Turkmenistan", shortform: "TM" },
    { name: "Tuvalu", shortform: "TV" },
    { name: "Uganda", shortform: "UG" },
    { name: "Ukraine", shortform: "UA" },
    { name: "United Arab Emirates", shortform: "AE" },
    { name: "United Kingdom", shortform: "GB" },
    { name: "United States of America", shortform: "US" },
    { name: "Uruguay", shortform: "UY" },
    { name: "Uzbekistan", shortform: "UZ" },
    { name: "Vanuatu", shortform: "VU" },
    { name: "Vatican City", shortform: "VA" },
    { name: "Venezuela", shortform: "VE" },
    { name: "Vietnam", shortform: "VN" },
    { name: "Yemen", shortform: "YE" },
    { name: "Zambia", shortform: "ZM" },
    { name: "Zimbabwe", shortform: "ZW" },
  ];
  useEffect(() => {
    if (cart.length > 0) {
      // Create a new products array based on cart items
      const updatedProducts = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.productQuantity,
      }));

      //console.log(updatedProducts);

      // Update formData immutably
      setFormData((prevData) => ({
        ...prevData,
        products: updatedProducts,
        total_amount: totalPrice.toFixed(2),
      }));

      // Optionally update orderedItems
      setOrderedItems(cart);
    }
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      axios.post(path + `order/newOrder/${userId}`, { formData });
    } catch (err) {
      console.log("Error in Handle submit", err);
    }
    // Here you would typically send the order data to your backend
    setIsOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
            Complete Your Order
          </h1>

          {!isOrderPlaced ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="town"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Village / Town
                  </label>
                  <input
                    type="text"
                    name="town"
                    id="town"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.town}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP / Postal Code
                  </label>
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a country</option>
                    {contries.map((country) => (
                      <option value={country.name} name={"country"}>
                        {country.name}
                      </option>
                    ))}

                    {/* Add more countries as needed */}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <p className="my-4 text-xl font-semibold">Payment method</p>

                  <div className="flex items-center justify-start ">
                    <label
                      htmlFor="payment_method"
                      className="block text-sm font-medium text-gray-700 min-w-32 h-8 py-1 "
                    >
                      Cash On Delivery
                    </label>
                    <input
                      type="radio"
                      name="payment_method"
                      id="payment_method"
                      required
                      className="block w-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={'Cash on delivery'}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center justify-start ">
                    <label
                      htmlFor="payment_method"
                      className="block text-sm font-medium text-gray-700 min-w-32 h-8 py-1 "
                    >
                      Online Payment
                    </label>
                    <input
                      type="radio"
                      name="payment_method"
                      id="payment_method"
                      required
                      className="block w-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={'Online payment'}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex flex-wrap justify-center item-center gap-6">
                    {orderedItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center w-56 shadow-md shadow-blue-300 rounded-md"
                      >
                        <img
                          src={item.productId.product_image}
                          alt={item.productId.product_name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.productId.product_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.productQuantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/*                   <p className="text-lg font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
                   */}{" "}
                </div>
              </div>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Place Order
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We'll send you a confirmation email
                shortly.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Details
                </h3>
                <p>
                  <strong>Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address}, {formData.city},{" "}
                  {formData.zipCode}, {formData.country}
                </p>
                <p>
                  <strong>Product:</strong> {product.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full px-4 py-3 flex justify-between items-center text-lg font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none"
        >
          <span>Order Summary</span>
          {showOrderSummary ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </button>
        {showOrderSummary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap justify-center item-center gap-6">
                {orderedItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center w-56 shadow-md shadow-blue-300 rounded-md"
                  >
                    <img
                      src={item.productId.product_image}
                      alt={item.productId.product_name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.productId.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.productQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/*               <p className="text-lg font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
               */}{" "}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">Tax (10%)</p>
                <p className="text-sm font-medium text-gray-900">
                  {tax.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-base font-semibold text-gray-900">Total</p>
                <p className="text-base font-semibold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
