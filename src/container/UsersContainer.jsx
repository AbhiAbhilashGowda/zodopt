import React, { useEffect, useState } from 'react';
import UsersTable from 'ui-component/Users/UsersTable';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'firebase';

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  console.log('users', users);

  const [products, setProducts] = useState([]);
  console.log('products', products);

  const [loading, setLoading] = useState(true); // State to manage loading indicator

  // Function to fetch all users from Firestore
  const getUsers = async () => {
    try {
      setLoading(true); // Show loading indicator
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const usersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersArray);
      setLoading(false); // Hide loading indicator
    } catch (error) {
      console.error('Error fetching users: ', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // Function to fetch all products from Firestore
  const getProducts = async () => {
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
    getProducts();
  }, []);

  return (
    <div>
      {/* Display loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Pass users and products state to UsersTable component */}
      {!loading && <UsersTable users={users} products={products} getUsers={getUsers} />}
    </div>
  );
};

export default UsersContainer;
