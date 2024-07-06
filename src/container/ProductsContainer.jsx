import React, { useEffect, useState } from 'react';
import ProductsTable from 'ui-component/products/productTable';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from 'firebase';

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  // Function to fetch all products from Firestore
  const getAllProducts = async () => {
    try {
      setLoading(true); // Show loading indicator
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsArray);
      setLoading(false); // Hide loading indicator
    } catch (error) {
      setLoading(false); // Hide loading indicator
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to delete a product by its ID
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(firestore, 'products', productId));
      console.log('Product successfully deleted!');
      getAllProducts(); // Refresh products after deletion
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return (
    <div>
      {/* Display loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Pass users and products state to ProductsTable component */}
      {!loading && <ProductsTable products={products} getAllProducts={getAllProducts} deleteProduct={deleteProduct} />}
    </div>
  );
};

export default ProductsContainer;
