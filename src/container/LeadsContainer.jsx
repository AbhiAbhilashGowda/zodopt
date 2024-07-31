import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AllLeads from 'ui-component/Leads/LeadsTable';
import { firestore } from 'firebase';
import { useSelector } from 'react-redux';

const LeadsContainer = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [incentives, setIncentives] = useState([]);
  const userRole = useSelector((state) => state?.authReducer?.userDetails?.roleDetails?.name);
  const user_id = useSelector((state) => state?.authReducer?.userDetails?.user_id);

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

        // Fetch incentives data
        const querySnapshot = await getDocs(collection(firestore, 'incentives'));
        const incentivesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Set state with fetched data
        setProducts(productsData);
        setUsers(usersData);
        setLeads(leadsData);
        setIncentives(incentivesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductsAndUsers();
  }, []); // Fetch data only once on component mount

  useEffect(() => {
    if (userRole === 'user') {
      const userLeads = leads.filter((lead) => lead.username === user_id);
      setFilteredLeads(userLeads);
    } else {
      setFilteredLeads(leads); // Show all leads if not a user
    }
  }, [userRole, user_id, leads]); // Re-run filtering logic when userRole, user_id, or leads change

  const handleCreateLead = async (newLeadData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'leads'), newLeadData);
      console.log('Lead added with ID:', docRef.id);

      // Update local state to reflect the new lead
      setLeads([...leads, { id: docRef.id, ...newLeadData }]);
    } catch (error) {
      console.error('Error creating lead:', error);
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
    }
  };

  const handleConvertCustomer = async (formData) => {
    try {
      await addDoc(collection(firestore, 'customers'), formData);
    } catch (error) {
      console.error('Error adding incentive: ', error);
    }
  };

  if (!leads.length) {
    return <p>Loading...</p>;
  }

  return (
    <AllLeads
      leads={filteredLeads}
      products={products}
      users={users}
      userRole={userRole}
      incentives={incentives}
      handleCreateLead={handleCreateLead}
      handleUpdateLead={handleUpdateLead}
      handleDeleteLead={handleDeleteLead}
      handleConvertCustomer={handleConvertCustomer}
    />
  );
};

export default LeadsContainer;
