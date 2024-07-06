// CustomersContainer.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from 'firebase';
import CustomersTable from 'ui-component/customers/CustomerTable';

const CustomersContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(firestore, 'customers'));
      const customersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCustomers(customersArray);
    } catch (error) {
      console.error('Error fetching customers: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsArray);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const createCustomer = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'customers'), {
        customerName: formData.name,
        productName: formData.product,
        cost: formData.cost,
        incPer: formData.incPer,
        incValue: formData.incValue
      });
      console.log('Customer added with ID: ', docRef.id);
      await fetchCustomers(); // Refresh customers data
    } catch (error) {
      console.error('Error adding customer: ', error);
    }
  };

  const updateCustomer = async (customerId) => {
    try {
      const customerRef = doc(firestore, 'customers', customerId);
      await updateDoc(customerRef, {
        customerName: formData.name,
        productName: formData.product,
        cost: formData.cost,
        incPer: formData.incPer,
        incValue: formData.incValue
      });
      console.log('Customer updated successfully:', customerId);
      await fetchCustomers(); // Refresh customers data
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await deleteDoc(doc(firestore, 'customers', customerId));
      console.log('Customer deleted successfully:', customerId);
      await fetchCustomers(); // Refresh customers data
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      {/* Render your loading indicator if loading */}
      {loading && <div>Loading...</div>}

      {/* Render customers table with props */}
      {!loading && (
        <CustomersTable
          customers={customers}
          products={products}
          fetchCustomers={fetchCustomers}
          createCustomer={createCustomer}
          updateCustomer={updateCustomer}
          deleteCustomer={deleteCustomer}
        />
      )}
    </div>
  );
};

export default CustomersContainer;
