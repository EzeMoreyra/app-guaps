import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uner.desmov.appguaps',
  appName: 'app-guaps',
  webDir: 'www',
  plugins:{
    FirebaseAuthentication:{
      skipNativeAuth: false,
      providers:["google.com"],
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '626201656480-q26g9dpp2cmoksnokqi1l6vqelcopeao.apps.googleusercontent.com',  // client ID de Google
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
