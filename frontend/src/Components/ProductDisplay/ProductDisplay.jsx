import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const formatPrice = (price) => {
  return price.toLocaleString('id-ID'); // Format harga ke Rupiah
};

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      {/* Bagian Kiri */}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(0)].map((_, index) => (
            <img key={index} src={product.image} alt={`Thumbnail ${index + 1}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="Main Product" />
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        {/* Rating */}
        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={star_icon} alt="Star" />
          ))}
          <img src={star_dull_icon} alt="Dull Star" />
          <span>(122)</span>
        </div>
        
        {/* Harga */}
        <div className="productdisplay-right-prices">
          <span className="productdisplay-right-price-old">
            Rp {formatPrice(product.old_price)}</span>
          <span className="productdisplay-right-price-new">
            Rp {formatPrice(product.new_price)}</span>
        </div>

        {/* Deskripsi Produk */}
        <p className="productdisplay-right-description">
          {product.description}
        </p>

        {/* Pilihan Ukuran */}
        <div className="productdisplay-right-size">
        </div>

        {/* Tombol Add to Cart */}
        <button onClick={() => { addToCart(product.id) }} className="add-to-cart">ADD TO CART</button>

        {/* Kategori dan Tags */}
        <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
        <p className='productdisplay-right-tags'><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
