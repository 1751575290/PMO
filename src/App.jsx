import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import GanttChart from './pages/GanttChart';
import ResourceManagement from './pages/ResourceManagement';
import ApprovalCenter from './pages/ApprovalCenter';
import RiskManagement from './pages/RiskManagement';
import DataAnalytics from './pages/DataAnalytics';
import Settings from './pages/Settings';
import NewProject from './pages/NewProject';
import GRReview from './pages/GRReview';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:projectId/gr/:grId" element={<GRReview />} />
          <Route path="gantt" element={<GanttChart />} />
          <Route path="resources" element={<ResourceManagement />} />
          <Route path="approval" element={<ApprovalCenter />} />
          <Route path="risks" element={<RiskManagement />} />
          <Route path="analytics" element={<DataAnalytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
