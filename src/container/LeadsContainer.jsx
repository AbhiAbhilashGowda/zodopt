import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AllLeads from 'ui-component/Leads/LeadsTable';
import { firestore } from 'firebase';

const LeadsContainer = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchProductsAndUsers = async () => {
      try {
        // Fetch products data
        const productsSnapshot = await getDocs(collection(firestore, 'products'));
        const productsData = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch users data
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch leads data
        const leadsSnapshot = await getDocs(collection(firestore, 'leads'));
        const leadsData = leadsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Set state with fetched data
        setProducts(productsData);
        setUsers(usersData);
        setLeads(leadsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductsAndUsers();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleCreateLead = async (newLeadData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'leads'), newLeadData);
      console.log('Lead added with ID:', docRef.id);

      // Update local state to reflect the new lead
      setLeads([...leads, { id: docRef.id, ...newLeadData }]);
    } catch (error) {
      console.error('Error creating lead:', error);
      // Handle error state or display error message to user
    }
  };

  const handleUpdateLead = async (leadId, updatedLeadData) => {
    try {
      const leadRef = doc(firestore, 'leads', leadId);
      await updateDoc(leadRef, updatedLeadData);
      console.log('Lead updated successfully:', leadId);

      // Update local state with updated lead data
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updatedLeadData } : lead
      );
      setLeads(updatedLeads);
    } catch (error) {
      console.error('Error updating lead:', error);
      // Handle error state or display error message to user
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await deleteDoc(doc(firestore, 'leads', leadId));
      console.log('Lead deleted successfully:', leadId);

      // Update local state by filtering out the deleted lead
      const updatedLeads = leads.filter((lead) => lead.id !== leadId);
      setLeads(updatedLeads);
    } catch (error) {
      console.error('Error deleting lead:', error);
      // Handle error state or display error message to user
    }
  };

  if (!leads || leads.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <AllLeads
      leads={leads}
      products={products}
      users={users}
      handleCreateLead={handleCreateLead}
      handleUpdateLead={handleUpdateLead}
      handleDeleteLead={handleDeleteLead}
    />
  );
};

export default LeadsContainer;
