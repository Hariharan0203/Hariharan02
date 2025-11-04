
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(item => item !== null);

    // Upload to Cloudinary
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    // Build product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes || "[]"),
      image: imageUrl,
      date: Date.now()
    };

    // Create and save product
    const product = new ProductModel(productData);
    await product.save();

  
    console.log("Saved Product Document:", product.toObject());

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



//function for list product
const listProduct = async (req,res)=>{

  try {
    
    const products = await ProductModel.find({});
    res.json({success:true,products})

  } catch (error) {
     console.error(error);
    res.json({ success: false, message: error.message });
  }
    
}

//function for remove product


const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body; // req.body must be defined

    if (!_id) {
      return res.json({ success: false, message: "_id is required" });
    }

    await ProductModel.findByIdAndDelete(_id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};




//function for single product info
const singleProduct = async (req,res)=>{
    
  try {
    
    const {productId} = req.body
    const product = await ProductModel.findById(productId)
    res.json({success:true,product})
    
  } catch (error) {
     console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export {listProduct,addProduct,removeProduct,singleProduct}