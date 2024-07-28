import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Material-UI imports
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// Third-party imports
import * as Yup from 'yup';
import { Formik } from 'formik';

// Firebase imports
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../../../../firebase';

// Assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { REGISTER, STORE_USER_DETAILS } from 'store/actions';
import { jwtDecode } from 'jwt-decode';
import { firestore } from 'firebase';

// Firebase auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const dispatch = useDispatch();

  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Save additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: values.name,
        email:  values.email,
        phone: values.phone,
        company: values.company,
        role: 'A6ZMjqcK4XCiE5KOfkgR' // Default role
      });

      // Get the ID token
      const idToken = await user.getIdToken();

      // Decode the token to get user details
      const decodedToken = jwtDecode(idToken);

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(firestore, 'users', decodedToken.user_id));
      const userDetails = userDoc.exists() ? userDoc.data() : {}; // Retrieve user data

      // Fetch user details from Firestore
      const roleDoc = await getDoc(doc(firestore, 'roles', userDetails?.role));
      const roleDetails = roleDoc.exists() ? roleDoc.data() : {}; // Retrieve user data

      const currentUser = {
        ...userDetails,
        roleDetails: roleDetails
      };
      dispatch({
        type: REGISTER,
        payload: {
          isLoggedIn: true,
          accessToken: idToken
        }
      });

      dispatch({
        type: STORE_USER_DETAILS,
        payload: {
          userDetails: currentUser
        }
      });
      // Navigate to the home page
      navigate('/');
      // Handle successful registration (e.g., redirect or show a success message)
      console.log('User registered successfully:', userCredential, user);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Sign up with Email address</Typography>
        </Box>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          phone: '',
          company: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          name: Yup.string().max(255).required('Name is required'),
          phone: Yup.string().max(20).required('Phone number is required'),
          company: Yup.string().max(255).required('company is required')
        })}
        onSubmit={handleSignUp}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-register">Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name-register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone-register"
                type="text"
                value={values.phone}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error id="standard-weight-helper-text-phone-register">
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.company && errors.company)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-company-register">company</InputLabel>
              <OutlinedInput
                id="outlined-adornment-company-register"
                type="text"
                value={values.company}
                name="company"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.company && errors.company && (
                <FormHelperText error id="standard-weight-helper-text-company-register">
                  {errors.company}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default AuthRegister;
