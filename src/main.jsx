import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/router';
import AuthProvider from './provider/AuthProvider';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
  </QueryClientProvider>
  </StrictMode>,
)
