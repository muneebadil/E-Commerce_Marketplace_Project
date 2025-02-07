// import { Product } from "../../../types/products"



// export const addToCart = (product : Product) => {
//     const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

//     const existingProductIndex = cart.findIndex(item => item._id === product._id)

//     if(existingProductIndex > -1) {
//         cart[existingProductIndex].inventory += 1
//     }
//     else {
//         cart.push({
//             ...product, inventory: 1
//         })
//     }

//     localStorage.setItem('cart', JSON.stringify(cart))
// }


// export const removeFromCart = (productId : string) => {
//     let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
//     cart = cart.filter(item => item._id !== productId)
//     localStorage.setItem('cart', JSON.stringify(cart))
// }

// export const updateCartQuantity = (productId :string, quantity : number) => {
//     const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
//     const productIndex = cart.findIndex(item => item._id === productId)

//     if(productIndex > -1) {
//         cart[productIndex].inventory = quantity;
//         localStorage.setItem('cart', JSON.stringify(cart))
//     }
// }


// export const getCartItems = () : Product[] => {
//     return JSON.parse(localStorage.getItem('cart') || '[]')
// }

// "use client"; // Ensures this file runs on the client side
// import { Product } from "../../../types/products"

// export const getCartItems = (): Product[] => {
//     if (typeof window !== "undefined") {
//         return JSON.parse(localStorage.getItem("cart") || "[]");
//     }
//     return [];
// };

// export const updateLocalStorage = (cart: Product[]) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("storage")); // Ensures React state updates properly
// };

// export const addToCart = (product: Product) => {
//     if (typeof window === "undefined") return;

//     let cart = getCartItems();
//     const existingProduct = cart.find(item => item._id === product._id);

//     if (existingProduct) {
//         existingProduct.inventory += 1;
//     } else {
//         cart.push({ ...product, inventory: 1 });
//     }

//     updateLocalStorage(cart);
// };

// export const removeFromCart = (id: string) => {
//     if (typeof window === "undefined") return;

//     let cart = getCartItems().filter(item => item._id !== id);
//     updateLocalStorage(cart);
// };

// export const updateCartQuantity = (id: string, quantity: number) => {
//     if (typeof window === "undefined") return;

//     let cart = getCartItems().map(item =>
//         item._id === id ? { ...item, inventory: quantity } : item
//     );

//     updateLocalStorage(cart);
// };

import { Product } from "../../../types/products";


export const addToCart = (product : Product) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item._id === product._id)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].inventory += 1
    }
    else {
        cart.push({
            ...product, inventory: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (productId : string) => {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCartQuantity = (productId :string, quantity : number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        cart[productIndex].inventory = quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const getCartItems = () : Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}



