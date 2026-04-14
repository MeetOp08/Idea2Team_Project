import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';

const Reports = () => {
    const reportCards = [
        { title: 'User Growth', icon: '👥', desc: 'Monthly user registration trends and growth metrics.' },
        { title: 'Revenue Analytics', icon: '💰', desc: 'Platform revenue breakdown and payment analytics.' },
        { title: 'Project Metrics', icon: '📊', desc: 'Project completion rates, budgets, and category breakdown.' },
        { title: 'User Satisfaction', icon: '⭐', desc: 'User ratings, reviews, and satisfaction scores.' },
    ];

    return (
        <DashboardLayout role="admin">
         
        </DashboardLayout>
    );
};

export default Reports;
