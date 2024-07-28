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

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* total leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} leads={leads} />
          </Grid>
          {/* assigned leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <AssignedLeadsCard isLoading={isLoading} leads={leads} />
          </Grid>
          {/* inassigned leads */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <UnassignedLeadsCard isLoading={isLoading} leads={leads} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* Leads charts */}
          <Grid item xs={12} md={8}>
            <LeadsBarChart isLoading={isLoading} leads={leads} />
          </Grid>
          {/* recent leads */}
          <Grid item xs={12} md={4}>
            <RecentLeads isLoading={isLoading} leads={leads} users={users} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
