import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoadingPage } from './pages/Loading'
import { LoginPage } from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
<<<<<<< HEAD
import LogsMain from './pages/LogsModule/LogsMain'
import ManageProfileMain from './pages/ManageProfile/ManageProfileMain'
import ProfileMain from './pages/Profile/ProfileMain'
import ArchivesMain from './pages/ArchiveModule/ArchivesMain'
=======
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { AssetRegistryPage } from './pages/AssetPage/AssetRegistryPage'
import { TaskMonitorPage } from './pages/TaskMonitor/TaskMonitor'
import { LostAndFoundPage } from './pages/LostandFound/LostAndFound'
import { IncidentReportPage } from './pages/IncidentReport/IncidentReporting'
import { ProfilePage } from './pages/Profile/ProfileMain'
import { LogsPage } from './pages/LogsModule/LogsMain'
import { ManageAccountsPage } from './pages/ManageAccounts/ManageAccountPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ArchivePage from './pages/Archives'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { ScannerPage } from './pages/ScannerPage'
import { AssetScanPage } from './pages/AssetScanPage'
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    const initApp = async () => {
      try {
        // Simulating a backend network delay
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // 🌟 BACKEND MOCK: Automatically log in a fake admin for local testing
        // Change 'admin' to 'custodian' or remove it to test different access states.
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', 'fake-mock-jwt-token');
          localStorage.setItem('userRole', 'admin'); 
          // Adjust the keys above ('token', 'userRole') to match what your ProtectedRoute expects!
        }

      } catch (error) {
        console.error("Initialization failed", error);
      } finally {
        setIsPageLoading(false);
      }
    };
=======
  const initApp = async () => {
    try {
      // only show loading on first load
      const hasVisited = sessionStorage.getItem('appLoaded');
      if (!hasVisited) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        sessionStorage.setItem('appLoaded', 'true');
      }
    } finally {
      setIsPageLoading(false);
    }
  };
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca

    initApp();
  }, []);

<<<<<<< HEAD
  if (isPageLoading) {
    return <LoadingPage />;
  }
=======
  if (isPageLoading) return <LoadingPage />;
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca

  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "custodian"]}>
              <LogsMain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "custodian"]}>
              <LogsMain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-task-monitor"
          element={
            <ProtectedRoute allowedRoles={["admin", "custodian"]}>
              <LogsMain />
            </ProtectedRoute>
          }
        />              
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginPage />} />
        
        <Route path='/audit-logs' 
          element={
            <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <LogsMain/>
            </ProtectedRoute>
          }
        />
        
        <Route path='/profile'
          element={
            <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <ProfileMain />
            </ProtectedRoute>
          }
        />
        
        <Route path='/manage-accounts'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageProfileMain />
            </ProtectedRoute>
          }
        />

        <Route path='/archives'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ArchivesMain />
            </ProtectedRoute>
          }
        />

        {/* Redirects to login if route is not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
=======
        {/* public routes */}
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/qr-scanner' element={<ScannerPage />} />
        <Route path='/asset/scan/:assetId' element={<AssetScanPage />} />

        {/* protected routes */}
        <Route path='/dashboard' 
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path='/asset-registry'
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <AssetRegistryPage />
          </ProtectedRoute>
        }
        />
        <Route path='/task-monitor'
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <TaskMonitorPage />
          </ProtectedRoute>
        }
        />
        <Route path='/lost-and-found'
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <LostAndFoundPage />
          </ProtectedRoute>
        }
        />
        <Route path='/incident-report'
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <IncidentReportPage />
          </ProtectedRoute>
        }
        />
        <Route path='/audit-logs'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
              <LogsPage />
          </ProtectedRoute>
        }
        />
        <Route path='/profile'
        element={
          <ProtectedRoute allowedRoles={['admin', 'custodian']}>
              <ProfilePage />
          </ProtectedRoute>
        }
        />
        <Route path='/manage-accounts'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
              <ManageAccountsPage />
          </ProtectedRoute>
        }
        />
        <Route path='/archives'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
              <ArchivePage />
          </ProtectedRoute>
        }
        />
      {/* redirects to login if not found or authenticated */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App
 
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca
