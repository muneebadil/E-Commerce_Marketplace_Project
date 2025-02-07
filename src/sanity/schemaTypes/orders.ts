// import { defineType } from "sanity"
// export const order = defineType({
//     name: "order",
//     title: "Orders",
//     type: "document",
//     fields: [
//       {
//         name: "firstName",
//         title: "First Name",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "lastName",
//         title: "Last Name",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "email",
//         title: "Email",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "phone",
//         title: "Phone Number",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "address",
//         title: "Address",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "city",
//         title: "City",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "zipCode",
//         title: "Zip Code",
//         type: "string",
//         validation: (rule) => rule.required(),
//       },
//       {
//         name: "cartItems",
//         title: "Cart Items",
//         type: "array",
//         of: [
//           {
//             type: "object",
//             fields: [
//               {
//                 name: "productId",
//                 title: "Product ID",
//                 type: "string",
//               },
//               {
//                 name: "title",
//                 title: "Product Title",
//                 type: "string",
//               },
//               {
//                 name: "quantity",
//                 title: "Quantity",
//                 type: "number",
//               },
//               {
//                 name: "price",
//                 title: "Price",
//                 type: "number",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: "subtotal",
//         title: "Subtotal",
//         type: "number",
//       },
//       {
//         name: "discount",
//         title: "Discount",
//         type: "number",
//       },
//       {
//         name: "total",
//         title: "Total",
//         type: "number",
//       },
//       {
//         name: "status",
//         title: "Order Status",
//         type: "string",
//         options: {
//           list: [
//             { title: "Pending", value: "pending" },
//             { title: "Processing", value: "processing" },
//             { title: "Shipped", value: "shipped" },
//             { title: "Delivered", value: "delivered" },
//             { title: "Cancelled", value: "cancelled" },
//           ],
//         },
//         initialValue: "pending",
//       },
//       {
//         name: "createdAt",
//         title: "Created At",
//         type: "datetime",
//         initialValue: new Date().toISOString(),
//       },
//     ],
//   });
  

const orderSchema = {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      { name: "firstName", title: "First Name", type: "string" },
      { name: "lastName", title: "Last Name", type: "string" },
      { name: "address", title: "Address", type: "string" },
      { name: "city", title: "City", type: "string" },
      { name: "zipcode", title: "Zip Code", type: "string" }, // ✅ Zipcode ko define karo
      { name: "phone", title: "Phone", type: "string" },
      { name: "email", title: "Email", type: "string" },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [{ type: "reference", to: [{ type: "product" }] }], // ✅ Reference define karo
      },
      { name: "total", title: "Total", type: "number" },
      { name: "discount", title: "Discount", type: "number" },
      { name: "orderDate", title: "Order Date", type: "datetime" }, // ✅ Order Date define karo
      {
                name: "status",
                title: "Order Status",
                type: "string",
                options: {
                  list: [
                    { title: "Pending", value: "pending" },
                    { title: "Processing", value: "processing" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                  ],
                },
                initialValue: "pending",
              },
    ],
  };

  export default orderSchema;
  