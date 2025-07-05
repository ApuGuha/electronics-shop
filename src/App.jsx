
import './App.css';

import { AuthProvider } from "./components/contexts/AuthContext";
import { AppRoutes } from './AppRoutes';

function App() {

  return (
    <>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
    </>
  )
}

export default App
