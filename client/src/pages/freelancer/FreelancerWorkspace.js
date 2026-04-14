import '../../styles/FreelancerWorkspace.css';
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import WorkspaceApp from '../../components/workspace/WorkspaceApp';

const FreelancerWorkspace = () => {
    return (
        <DashboardLayout role="freelancer">
           <WorkspaceApp role="freelancer" />
        </DashboardLayout>
    );
};

export default FreelancerWorkspace;
