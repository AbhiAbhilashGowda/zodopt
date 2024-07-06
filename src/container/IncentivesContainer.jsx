import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'firebase';
import IncentivesTable from 'ui-component/Incentives/IncentivesTable';

const CustomersContainer = () => {
  const [incentives, setIncentives] = useState([]);
  console.log('incentives', incentives);

  const [products, setProducts] = useState([]);
  console.log('products', products);

  const [loading, setLoading] = useState(true); // State to manage loading indicator

  // Function to fetch all incentives from Firestore
  const getIncentives = async () => {
    try {
      setLoading(true); // Show loading indicator
      const querySnapshot = await getDocs(collection(firestore, 'incentives'));
      const usersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncentives(usersArray);
    } catch (error) {
      console.error('Error fetching users: ', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  useEffect(() => {
    getIncentives();
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
      {!loading && <IncentivesTable incentives={incentives} products={products} getIncentives={getIncentives} />}
    </div>
  );
};

export default CustomersContainer;
