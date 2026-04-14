import '../../styles/FounderWorkspace.css';
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import WorkspaceApp from '../../components/workspace/WorkspaceApp';

const FounderWorkspace = () => {
    return (
        <DashboardLayout role="founder">
           <WorkspaceApp role="founder" />
        </DashboardLayout>
    );
};

export default FounderWorkspace;
