let StartingProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];

let StartingUsers = [
  { id: 1, email: "user1@user.com", password: "user1" },
  { id: 2, email: "user2@user.com", password: "user2" },
  { id: 3, email: "user3@user.com", password: "user3" },
  { id: 4, email: "user4@user.com", password: "user4" },
  { id: 5, email: "admin@admin.com", password: "admin" },
];
const users = JSON.parse(localStorage.getItem("users"));
window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(StartingProducts));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(StartingUsers));
  }
  if (location.pathname === "/pages/index.html") {
    loadCustomerProducts();
  }
  if (location.pathname === "/pages/admin/index.html") {
    loadadminPage();
    console.log(location.pathname);
  }
  if (location.pathname === "/pages/admin/add_product.html") {
    let newurl = new URL(document.location).searchParams;
    let productid = newurl.get("id");
    console.log(productid);
    if (productid) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productid)
      );

      populateproduct(product);
    }
  }

  if (location.pathname === "/pages/cart.html") {
    loadCartPage();
  }

  if (
    location.pathname === "/pages/cart.html" ||
    location.pathname === "/pages/orders.html" ||
    location.pathname === "/pages/index.html"
  ) {
    updatecartcount();
  }
  if (location.pathname === "/pages/order.html") {
    loadorderpage();
  }
});

// const userLogin = () => {
//   const emailRef = document.getElementById("email");
//   const passwordRef = document.getElementById("password");
//   const errorRef = document.getElementById("error");

//   if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
//     const users = JSON.parse(localStorage.getItem("users"));
//     const loginuser = users.find(
//       (user) =>
//         user.email === emailRef.value && user.password === passwordRef.value
//     );

//     if (!loginuser) {
//       errorRef.innerText = "invalid email or password";
//     } else {
//       sessionStorage.setItem("users", loginuser.id);
//       if (emailRef.value === "admin@admin.com")
//         location.replace("/pages/admin/index.html");
//       else location.replace("/pages/index.html");
//     }
//   } else {
//     errorRef.innerText = "email or password is empty";
//   }
// };

const userLogin = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");

  if (emailRef.value.length === 0) {
    errorRef.innerText = "email is empty";
  }
  if (!validateEmail(emailRef.value)) {
    errorRef.innerText = "invalid email";
    return;
  }
  if (passwordRef.value.length === 0) {
    errorRef.innerText = "password is empty";
  }
  if (passwordRef.value.length < 3) {
    errorRef.innerText = "password is not valid";
  }
  const loginuser = users.find(
    (user) =>
      user.email === emailRef.value && user.password === passwordRef.value
  );
  if (!loginuser) {
    errorRef.innerText = "invalid credentials";
    return;
  }

  sessionStorage.setItem("users", loginuser.id);
  errorRef.innerText = "";
  if (loginuser.email === "admin@admin.com")
    location.replace("/pages/admin/index.html");
  else location.replace("/pages/index.html");
};
const validateEmail = (email) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userLogOut = () => {
  location.replace("/pages/login.html");
};

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const getRandomId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

const register = () => {
  const userNameRef = document.getElementById("userregname");
  const emailRef = document.getElementById("regemail");
  const passwordRef = document.getElementById("regpassword");
  const password2Ref = document.getElementById("regpassword2");
  const errorRef = document.getElementById("regerror");

  if (
    userNameRef.value.length > 0 &&
    emailRef.value.length > 0 &&
    passwordRef.value.length > 0 &&
    password2Ref.value.length > 0
  ) {
    if (emailRef.value.length === 0) {
      errorRef.innerText = "email is empty";
    }
    if (!validateEmail(emailRef.value)) {
      errorRef.innerText = "invalid email";
      // return;
    }
    if (passwordRef.value.length === 0) {
      errorRef.innerText = "password is empty";
    }
    if (passwordRef.value.length < 3) {
      errorRef.innerText = "password is not valid";
    }
    if (password2Ref.value.length === 0) {
      errorRef.innerText = "password is empty";
    }
    if (password2Ref.value.length < 3) {
      errorRef.innerText = "password is not valid";
    }
    if (passwordRef.value === password2Ref.value) {
      let users = JSON.parse(localStorage.getItem("users"));

      users.push({
        id: getRandomId(),
        email: emailRef.value,
        password: passwordRef.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      location.replace("/pages/login.html");
    } else {
      errorRef.innerText = "password doesn't match";
    }
  } else {
    errorRef.innerText = "email or password is empty";
  }
};

// const UpdateProducts = () => {
//   nameRef = document.getElementById("name");
//   amountRef = document.getElementById("price");
//   descriptionRef = document.getElementById("desc");
//   imageRef = document.getElementById("image");
//   // idRef=document.getElementById("id");

//   let products = JSON.parse(localStorage.getItem("products"));
//   if (
//     nameRef.value.length > 0 &&
//     amountRef.value.length > 0 &&
//     descriptionRef.value.length > 0 &&
//     imageRef.value.length > 0
//   ) {
//     products.push({
//       id: getRandomId("users"),
//       title: nameRef.value,
//       price: amountRef.value,
//       description: descriptionRef.value,
//       thumbnail: imageRef.value,
//     });
//   } else {
//     const product = products.find((product) => product.id === parseInt(id));
//     products = products.filter((product) => product.id !== parseInt(id));
//     products.push({
//       ...product,
//       title: nameRef.value,
//       price: amountRef.value,
//       description: descriptionRef.value,
//       thumbnail: imageRef.value,
//     });
//   }

//   // console.log(nameRef.value+","+amountRef.value+","+descriptionRef.value+","+imageRef.value);
//   localStorage.setItem("products", JSON.stringify(products));
//   location.href = "/pages/admin/index.html";
// };

const UpdateProducts = () => {
  try {
    const nameRef = document.getElementById("name");
    const idRef = document.getElementById("hidden");
    const priceRef = document.getElementById("price");
    const descriptionRef = document.getElementById("desc");
    const imageRef = document.getElementById("image");
    const toastRef = document.getElementById("toast");
    const toastMessageRef = document.getElementById("toastMessage");

    // Retrieve and parse products from local storage
    let products = JSON.parse(localStorage.getItem("products"));

    // Get the product ID from the input field
    const title = nameRef.value;
    // console.log('id->',id);
    if (title) {
      // Find the index of the product with the matching title
      const indexToUpdate = products.findIndex(
        (product) => product.title === title
      );

      if (indexToUpdate !== -1) {
        // Update the existing product if found
        products[indexToUpdate] = {
          ...products[indexToUpdate],
          title: nameRef.value,
          description: descriptionRef.value,
          price: priceRef.value,
          thumbnail: imageRef.value,
        };
        toastMessageRef.innerText = "Product updated successfully!";
      } else {
        toastMessageRef.innerText = "Product not found for update.";
      }
    } else {
      // Generate a new ID and add a new product
      const newProduct = {
        id: getRandomId("products"),
        title: nameRef.value,
        description: descriptionRef.value,
        price: priceRef.value,
        thumbnail: imageRef.value,
      };

      products.push(newProduct);
      toastMessageRef.innerText = "Product added successfully!";
    }

    // Update local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Show toast notification
    toastRef.classList.add("fade", "show");

    setTimeout(() => {
      toastRef.classList.remove("fade", "show");
    }, 2000);

    // Redirect to another page
    location.href = "/pages/admin/index.html";
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error or display an error message as needed
  }
};

const loadCustomerProducts = () => {
  const productsRef = document.getElementById("productsRow");
  let products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-secondary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-warning" onClick="addToCart(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }
  productsRef.innerHTML = body;
};

const loadadminPage = () => {
  const productsRef = document.getElementById("productsTableBody");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<tr>
    <td><img src="${
      product.thumbnail
    }" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-warning me-2" onClick="editProduct(${
        product.id
      })">Edit</button>
      <button class="btn btn-danger" onClick="deleteProduct(${
        product.id
      })">Delete</button>
    </td>
  </tr>`;
  }

  productsRef.innerHTML = body;
};

const deleteProduct = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProducts));
  loadadminPage();
};

const editProduct = (id) => {
  location.href = `/pages/admin/add_product.html?id=${id}`;
};

const populateproduct = (product) => {
  nameRef = document.getElementById("name");
  amountRef = document.getElementById("price");
  descriptionRef = document.getElementById("desc");
  imageRef = document.getElementById("image");
  titleRef = document.getElementById("title");
  updatebtnRef = document.getElementById("updatebtn");

  nameRef.value = product.title;
  amountRef.value = product.price;
  descriptionRef.value = product.description;
  imageRef.value = product.thumbnail;
  titleRef.innerText = "Edit Product";
  updatebtnRef.innerText = "Edit Products";
};

// const addToCart = (productId) => {
//   // Check if the user is logged in
//   const users = localStorage.getItem("users");

//   if (!users) {
//     // Redirect to the login page if the user is not logged in
//     location.href = "/pages/login.html";
//     return; // Exit the function to prevent further execution
//   }

//   try {
//     // Retrieve the products from local storage
//     let products = JSON.parse(localStorage.getItem("products"));

//     // Find the product to add to the cart
//     const product = products.find(
//       (product) => product.id === parseInt(productId)
//     );

//     if (!product) {
//       // Handle the case where the product is not found
//       console.error("Product not found.");
//       return; // Exit the function to prevent further execution
//     }
//     let userId = localStorage.getItem("userId");
//     // Retrieve the cart from local storage or initialize an empty cart
//     let cart = JSON.parse(localStorage.getItem("cart"));

//     // Find the cart item for the current user and product
//     let cartItemIndex = -1;
//     if (cart) {
//       cartItemIndex = cart.findIndex((item) => item.id === parseInt(productId));
//     }

//     if (cartItemIndex !== -1) {
//       // If the item is already in the cart, update the count
//       cart[cartItemIndex].count++;
//     } else {
//       // If the item is not in the cart, add it
//       cart.push({ userId, count: 1, ...product });
//     }

//     // Update the cart in local storage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // Call a function to update the cart count display
//     updateCartCount();
//   } catch (error) {
//     console.error("An error occurred:", error);
//     // Handle the error or display an error message as needed
//   }
// };

const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("users")) {
    location.href = "/pages/login.html";
  } else {
    let users = parseInt(sessionStorage.getItem("users"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.users === parseInt(users) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.users === parseInt(users)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ users: parseInt(users), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// console.log(location.pathname);

const loadCartPage = () => {
  const carttableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const tableRef = document.getElementById("table");
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  console.log(cart);
  if (sessionStorage.getItem("users")) {
    const users = parseInt(sessionStorage.getItem("users"));
    const userCart = cart.filter((c) => c.users === users);

    let body = "";
    let total = 0;
    for (let cartItem of userCart) {
      total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
      const count = cartItem.count * cartItem.price;
      body += `<tr>
                    <td>${cartItem.title}</td>
                    <td>${cartItem.count}</td>
                    <td>${cartItem.price}</td>
                    <td>₹ ${count}</td>
                  </tr>`;
    }
    carttableRef.innerHTML = body;
    totalRef.innerText = `Total - ₹ ${total}`;
  } else {
    location.href = "/pages/login.html";
  }
  // console.log(cart);
};

const updatecartcount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("users")) {
    const users = parseInt(sessionStorage.getItem("users"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.users === users);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/pages/login.html";
};

const checkOutHandler = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updatecartcount();
      location.href = "/pages/index.html";
    } else {
      location.href = "/pages/index.html";
    }
  } else {
    location.href = "login.html";
  }
};

// const loadorderpage=()=>{
//   const ordertableRef=document.getElementById("ordertable");
//   if(sessionStorage.getItem("users")){

//   }
// };
