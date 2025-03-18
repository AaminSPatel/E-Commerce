import { useEffect, useState } from "react";
import { useShop } from "../shopContext";
import Image from "next/image";

const UpdateProductModal = ({ product, onClose, onUpdate ,isUpdate}) => {
    const {path, items , setItems} = useShop()
//const [product, setProduct] = useState(items[0])
/* 
useEffect(() => {
    let findProduct = items.find(item => item._id === productId);
    if (findProduct) {
        console.log('Product found:', findProduct);
    } else {
        console.log('Product not found');
    }
}, [productId, items]); // Also depend on `items` to handle changes
 */

    const [formData, setFormData] = useState({
        product_name: product.product_name || "",
        product_category: product.product_category || "",
        product_brand: product.product_brand || "",
        product_price: product.product_price || "",
        product_discount: product.product_discount || "",
        product_availability: product.product_availability || 100,
        description: product.description || "",
    })
    
   // console.log('product clicked',product);
    

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
        
    };

    // Submit updated data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateFormData = new FormData();
            updateFormData.append("product_name", formData.product_name);
            updateFormData.append("product_category", formData.product_category);
            updateFormData.append("product_brand", formData.product_brand);
            updateFormData.append("product_price", formData.product_price);
            updateFormData.append("product_discount", formData.product_discount);
            updateFormData.append("product_availability", formData.product_availability);
            updateFormData.append("description", formData.description);

            if (image) {
                //console.log(image);
                updateFormData.append("product_image", image); // Send image file
            }
else{
    updateFormData.append("product_image", ''); // Send image file

}
            // Send data to backend
            if(isUpdate){
                const response = await fetch(`${path}product/${product._id}`, {
                    method: "PUT",
                    body: updateFormData, // No need to set headers for FormData
                });
        
                if (!response.ok) throw new Error("Failed to update product");
        
                const updatedProduct = await response.json();
                onUpdate(updatedProduct); // Update UI
    
            }
            else{
                const response = await fetch(`${path}product`, {
                    method: "POST",
                    body: updateFormData, // No need to set headers for FormData
                });
        
                if (!response.ok) throw new Error("Failed to update product");
        
                const updatedProduct = await response.json();
                console.log('All Products', updatedProduct);
                setItems(updatedProduct)
                //onUpdate(updatedProduct); // Update UI
    
            }
          
            onClose(); // Close modal
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center mt-10 justify-center bg-black bg-opacity-50">
            <div className="bg-white py-4 px-6 rounded-lg shadow-lg ">
                <h2 className="text-xl font-semibold mb-2">{isUpdate? 'Update Product' :'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col ">
                     <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_name" className="text-md p-1 text-nowrap w-20">Name :</label>

                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Product Name" required />
                    </div> 
                <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_category" className="text-md p-1 text-nowrap w-20">Category :</label>

                    <input type="text" name="product_category" value={formData.product_category} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Category" required />
                    </div> 
                    <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_brand" className="text-md p-1 text-nowrap w-20">Brand :</label>

                    <input type="text" name="product_brand" value={formData.product_brand} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Brand" required />
                    </div> 
                      <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_price" className="text-md p-1 text-nowrap w-20">Price :</label>

                    <input type="number" name="product_price" value={formData.product_price} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Price" required />
                    </div> 
                      <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_discount" className="text-md p-1 text-nowrap w-20">Discount :</label>

                    <input type="number" name="product_discount" value={formData.product_discount} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Discount (%)" />
                    </div> 
                      <div className="flex items-center justify-center gap-8">
                     <label htmlFor="product_availability" className="text-md p-1 text-nowrap w-20">Availability :</label>

                    <input type="number" name="product_availability" value={formData.product_availability} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Stock" />
                    </div> 
                    <div className="flex items-center justify-center gap-8">
                     <label htmlFor="description" className="text-md p-1 text-nowrap w-20">Description :</label>

    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description"></textarea>
                    </div> 
            {  isUpdate &&                
<div className="flex">
    <label className="block mb-2">Current Image:</label>
          <Image
        height={200}
        width={200} src={product.product_image} alt="Product" className="w-20 shadow-amber-100 shadow-2xl h-12 object-cover rounded" />
</div>}
                    <div className="flex gap-5">
                        <label className="block mt-2">{isUpdate ? 'Upload New Image:' :'Add Image'}</label>
                    <input type="file" name="product_image" onChange={handleImageChange} className="w-full p-1 border rounded" />
                    </div>
                 
                    <div className="flex justify-between ">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
                            {isUpdate? loading ? "Updating..." : "Update" :  loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
