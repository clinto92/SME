import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};
// import React from 'react'
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Profile = () => {
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const from =  "/profile";

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("submitting...");
      setTimeout(() => {
        console.log("submited!!");
        setAuth(true);
        navigate(from, { replace: true });
      }, 2000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  return (
    <Paper sx={{margin: '100px', padding: '160px'}}>

    
<FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email Address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Login"}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
    </Paper>
  )
}

export default Profile;


  //   <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
  //   <Grid.Column style={{ maxWidth: 450 }}>
  //     <Header as='h2' color='teal' textAlign='center'>
  //       <Image src='/logo.png' /> Log-in to your account
  //     </Header>
  //     <Form size='large'>
  //       <Segment stacked>
  //         <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
  //         <Form.Input
  //           fluid
  //           icon='lock'
  //           iconPosition='left'
  //           placeholder='Password'
  //           type='password'
  //         />

  //         <Button color='teal' fluid size='large'>
  //           Login
  //         </Button>
  //       </Segment>
  //     </Form>
  //     <Message>
  //       New to us? <a href='/sign-up'>Sign Up</a>
  //     </Message>
  //   </Grid.Column>
  // </Grid>
