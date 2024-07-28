import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Link } from 'react-router-dom';

const RecentLeads = ({ isLoading, leads, users }) => {
  const getUserName = (userId) => {
    const user = users?.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Recent Leads</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {leads &&
                leads.length &&
                leads.map((lead) => {
                  return (
                    <Grid item xs={12} style={{ padding: '16px 0 0 24px' }}>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {getUserName(lead.username)}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    ₹ {lead?.lead_value}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: '5px',
                                      bgcolor: 'success.light',
                                      color: 'success.dark',
                                      ml: 2
                                    }}
                                  >
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                  </Avatar>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                            {lead?.customer_name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                    </Grid>
                  );
                })}
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Link to={'/leads'}>
              <Button size="small">
                View All
                <ChevronRightOutlinedIcon />
              </Button>
            </Link>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

export default RecentLeads;
