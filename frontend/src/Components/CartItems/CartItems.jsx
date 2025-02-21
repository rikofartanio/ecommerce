import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Fungsi untuk mengarahkan ke WhatsApp dengan detail pesanan
    const handleCheckout = () => {
        const phoneNumber = "6281246201284"; // Ganti dengan nomor WhatsApp admin
        let message = "Pesanan saya:\n";
        
        all_product.forEach((e) => {
            if (cartItems[e.id] > 0) {
                message += `- ${e.name} Rp.${e.new_price} x ${cartItems[e.id]} = Rp.${e.new_price * cartItems[e.id]}\n`;
            }
        });

        message += `\nTotal: Rp.${getTotalCartAmount()}\n\nMohon konfirmasi pesanan saya. Terima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>Rp.{e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total Pesanan</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rp.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp.{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {/* Tambahkan onClick untuk mengarahkan ke WhatsApp */}
                    <button onClick={handleCheckout}>CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
