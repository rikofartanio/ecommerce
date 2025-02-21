import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        description: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log("Sending Product Data:", productDetails);
        let responseData;

        let formData = new FormData();
        formData.append("name", productDetails.name);
        formData.append("category", productDetails.category);
        formData.append("new_price", productDetails.new_price);
        formData.append("old_price", productDetails.old_price);
        formData.append("description", productDetails.description);
        formData.append("image", image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
        })
        .then(resp => resp.json())
        .then(data => { responseData = data });

        if (responseData.success) {
            let product = { ...productDetails, image: responseData.image_url };
            console.log("Final Product Data:", product);

            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: { 
                    Accept:'application/json',
                    'Content-Type': "application/json" 
                },
                body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here'/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here'/>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Description</p>
                <textarea value={productDetails.description} onChange={changeHandler} name="description" placeholder='Enter product description'></textarea>
            </div>
            <div className="addproduct-field">
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
