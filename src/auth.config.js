// src/auth.config.js
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnInvoices = nextUrl.pathname.startsWith('/invoices');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      
      if ((isOnDashboard || isOnInvoices) && !isLoggedIn) {
        return false; // Redirect to login
      }
      
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
};