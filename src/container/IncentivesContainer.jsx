import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from 'firebase';
import IncentivesTable from 'ui-component/Incentives/IncentivesTable';
import { useSelector } from 'react-redux';

const IncentivesContainer = () => {
  const [incentives, setIncentives] = useState([]);
  console.log('incentives', incentives);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = useSelector((state) => state?.authReducer?.userDetails?.roleDetails?.name);

  const fetchIncentives = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(firestore, 'incentives'));
      const incentivesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncentives(incentivesArray);
    } catch (error) {
      console.error('Error fetching incentives: ', error);
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

  const addIncentive = async (newIncentive) => {
    console.log('newIncentive', newIncentive);
    try {
      await addDoc(collection(firestore, 'incentives'), newIncentive);
      fetchIncentives();
    } catch (error) {
      console.error('Error adding incentive: ', error);
    }
  };

  const updateIncentive = async (id, updatedIncentive) => {
    try {
      const incentiveDoc = doc(firestore, 'incentives', id);
      await updateDoc(incentiveDoc, updatedIncentive);
      fetchIncentives();
    } catch (error) {
      console.error('Error updating incentive: ', error);
    }
  };

  const deleteIncentive = async (id) => {
    try {
      const incentiveDoc = doc(firestore, 'incentives', id);
      await deleteDoc(incentiveDoc);
      fetchIncentives();
    } catch (error) {
      console.error('Error deleting incentive: ', error);
    }
  };

  useEffect(() => {
    fetchIncentives();
    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <IncentivesTable
          incentives={incentives}
          products={products}
          userRole={userRole}
          fetchIncentives={fetchIncentives}
          addIncentive={addIncentive}
          updateIncentive={updateIncentive}
          deleteIncentive={deleteIncentive}
        />
      )}
    </div>
  );
};

export default IncentivesContainer;
