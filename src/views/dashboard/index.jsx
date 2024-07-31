import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import EarningCard from './EarningCard';
import AssignedLeadsCard from './AssignedLeadsCard';
import UnassignedLeadsCard from './UnassignedLeadsCard';
import { gridSpacing } from 'store/constant';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'firebase';
import RecentLeads from './RecentLeads';
import LeadsBarChart from './LeadsBarChart';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const userRole = useSelector((state) => state?.authReducer?.userDetails?.roleDetails?.name);
  const user_id = useSelector((state) => state?.authReducer?.userDetails?.user_id);

  console.log('leads', leads);

  useEffect(() => {
    const fetchProductsAndUsers = async () => {
      try {
        setLoading(true);
        // Fetch products data
        const leadsSnapshot = await getDocs(collection(firestore, 'leads'));
        const leadsData = leadsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch users data
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setLeads(leadsData);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchProductsAndUsers();
  }, []); //

  useEffect(() => {
    if (userRole === 'user') {
      const userLeads = leads.filter((lead) => lead.username === user_id);
      setFilteredLeads(userLeads);
    } else {
      setFilteredLeads(leads); // Show all leads if not a user
    }
  }, [userRole, user_id, leads]); // Re-run filtering logic when userRole, user_id, or leads change

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* total leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} leads={filteredLeads} />
          </Grid>
          {/* assigned leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <AssignedLeadsCard isLoading={isLoading} leads={filteredLeads} />
          </Grid>
          {/* inassigned leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <UnassignedLeadsCard isLoading={isLoading} leads={filteredLeads} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* Leads charts */}
          <Grid item xs={12} md={8}>
            <LeadsBarChart isLoading={isLoading} leads={filteredLeads} />
          </Grid>
          {/* recent leads */}
          <Grid item xs={12} md={4}>
            <RecentLeads isLoading={isLoading} leads={filteredLeads} users={users} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
