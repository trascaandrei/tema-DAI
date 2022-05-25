import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import AuthService from '../services/auth.service'
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Trebuie să fie o adresă de email validă!')
        .max(255)
        .required(
          'Emailul este obligatoriu'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'Prenumele este obligatoriu'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Numele este obligatoriu'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Parola  este obligatorie'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Trebuie să fiți de acord cu termenii și condițiile'
        )
    }),
    onSubmit: () => {
      AuthService
        .register(
          `${formik.values.firstName}.${formik.values.lastName}`, formik.values.email, 
          formik.values.password
        )
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setSnackbar(true);
            setTimeout(() => {
              router.push('/login');
            }, 5000);
          }
        })
    }
  });

  return (
    <>
      <Head>
        <title>
          Înregistrare | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Creare cont
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Folosește email-ul pentru a crea un cont nou
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Prenume"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Nume"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Adresă Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Parolă"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Sunt de acord cu
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Termenii și condițiile
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Înregistrare
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Ai deja un cont?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Conectare
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>

      <Snackbar open={snackbar} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Contul dumneavoastră a fost înregistrat cu succes! După ce contul va fi confirmat de un administrator, vă veți putea autentifica.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
