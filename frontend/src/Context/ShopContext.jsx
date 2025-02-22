import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // Mengambil data produk dan cart dari server
    useEffect(() => {
        // Fetching produk
        fetch('https://api.shopmart10.shop/allproducts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setAll_product(data))
            .catch((error) => console.error("Fetch error (allproducts):", error));

        // Mengambil cart dari localStorage atau server
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://api.shopmart10.shop/getcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setCartItems(data))
            .catch((error) => console.error("Fetch error (getcart):", error));
        } else {
            // Cek jika cart ada di localStorage
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        }
    }, []);

    // Menambahkan item ke cart
    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            // Simpan ke localStorage setiap perubahan cart
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });

        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://api.shopmart10.shop/addtocart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Fetch error (addtocart):", error));
        }
    };

    // Menghapus item dari cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
            // Simpan ke localStorage setiap perubahan cart
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });

        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://api.shopmart10.shop/removefromcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Fetch error (removefromcart):", error));
        }
    };

    // Menghitung total harga cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Menghitung total item dalam cart
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // Menunggu data produk tersedia sebelum rendering
    if (!all_product.length) {
        return <div>Loading products...</div>; // Bisa ganti dengan komponen loading lainnya
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
