import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("Error in get products: ", error.message);
        res.status(500).json({success:false, message: 'Server Error'});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    } catch (error) {
        console.log("Error in create product: ", error.message);
        res.status(500).json({success:false, message: 'Server Error'});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body; //fields the user wants to update

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    } catch (error) {
        console.log("Error in update product: ", error.message);
        res.status(500).json({success:false, message: 'Servor error'});
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    //console.log("id :",id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:'Product deleted successfully'});
    } catch (error) {     
        console.log("Error in delete product: ", error.message);
        res.status(500).json({success:false, message: 'Server Error'});
    }
};