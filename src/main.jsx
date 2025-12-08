// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { router } from './routes/Routes.jsx'
// import { RouterProvider } from 'react-router'
// // import AuthProvider from './providers/AuthProvider.jsx'
// import { Toaster } from 'react-hot-toast'
// import AuthProvider from './Providers/AuthProvider.jsx'
// // import { AuthProvider } from './providers/AuthContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//       <Toaster position='top-right' reverseOrder={false} />
//     </AuthProvider>
//   </StrictMode>
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
// import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from './Providers/AuthProvider.jsx'

// Create a React Query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
