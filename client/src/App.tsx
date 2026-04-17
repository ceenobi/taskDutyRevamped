import AuthProvider from './context/AuthProvider'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
