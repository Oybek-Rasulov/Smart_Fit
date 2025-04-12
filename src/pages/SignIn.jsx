import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon } from '../components/User/CustomIcons';

import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail
} from '../firebase/firebase';

import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#ffffff',
  border: '2px solid #40B93C',
  boxShadow:
    'hsla(118, 50%, 48%, 0.3) 0px 5px 15px, hsla(118, 50%, 48%, 0.3) 0px 15px 35px -5px',

  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },

  ...theme.applyStyles('dark', {
    backgroundColor: '#1e1e1e',
    border: '2px solid #40B93C',
    boxShadow:
      'hsla(118, 50%, 48%, 0.4) 0px 5px 15px, hsla(118, 50%, 48%, 0.4) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    }),
  },
}));

export default function SignIn(props) {
  const navigate = useNavigate();
  const { providerValue } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      await fetch('http://localhost:3001/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        userid: result.user.uid,
        provider: result.user.providerData[0]?.providerId,
      };

      providerValue.login(userInfo);
      navigate('/');

    } catch (error) {
      console.error('❌ Google Sign-In Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const token = await result.user.getIdToken();

      await fetch('http://localhost:3001/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        userid: result.user.uid,
        provider: result.user.providerData[0]?.providerId,
      };

      providerValue.login(userInfo);
      navigate('/');

    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const email = error.customData?.email;

        try {
          if (!email) {
            alert('⚠️ Unable to detect email. Please try another login method.');
            return;
          }

          const methods = await fetchSignInMethodsForEmail(auth, email);

          console.log('✅ Sign-in methods:', methods);

          if (methods.length === 0) {
            alert('⚠️ This email exists but has no linked login method.');
          } else if (methods.includes('google.com')) {
            alert('⚠️ This email is already linked with Google. Please sign in using Google.');
          } else {
            alert(`⚠️ This email is already linked with: ${methods[0]}`);
          }

        } catch (lookupError) {
          console.error('❌ Failed to fetch sign-in methods:', lookupError);
        }
      } else {
        console.error('❌ Facebook Sign-In Error:', error);
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign In
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{
                color: '#fff',
                height: '3rem',
                '&:hover': { backgroundColor: '#fff', color: '#333' },
              }}
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleFacebookLogin}
              startIcon={<FacebookIcon />}
              sx={{
                color: '#fff',
                height: '3rem',
                '&:hover': { backgroundColor: '#fff', color: '#333' },
              }}
            >
              Sign in with Facebook
            </Button>

            <Typography sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" variant="body2" sx={{ alignSelf: 'end' }}>
                Sign up
              </Link>
              <Link href="/tlogin" variant="body2" sx={{ alignSelf: 'end' }}>
                Trainer
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
