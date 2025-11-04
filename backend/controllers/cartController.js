


// add product to user cart

import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        return res.json({success: true, message: "Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const removeFromCart = async (req, res) => {
  try {
 // set by auth middleware
    const {userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]?.[size]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Item removed from cart", cartData: cartData || {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

 

// update product  user cart

const updateCart = async (req,res) =>{

try {
    const {userId,itemId,size,quantity} =req.body

     const userData = await userModel.findById(userId)
     let cartData = await userData.cartData;

     cartData[itemId][size] = quantity

       await userModel.findByIdAndUpdate(userId,{cartData})
         req.json({success :true,message:"Cart updated"})

} catch (error) {
     console.log(error)
        res.json({success:false,message:error.message})
}

}


// get user to data

const getUserCart = async (req,res) =>{
  try {
    const {userId} =req.body

     const userData = await userModel.findById(userId)
     let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    
  }
}
export {addToCart,updateCart,getUserCart,removeFromCart}