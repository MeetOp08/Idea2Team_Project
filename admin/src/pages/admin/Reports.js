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
            <div className="page-header">
                <div>
                    <h1>Reports</h1>
                    <p>View platform analytics and generate reports.</p>
                </div>
                <Button variant="primary">📥 Export All</Button>
            </div>

            {/* Summary Cards */}
            <div className="stats-grid" style={{ marginBottom: '32px' }}>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px', width: '100%', textAlign: 'center', gridColumn: '1 / -1' }}>No summary data available.</p>
            </div>

            {/* Report Charts */}
            <div className="reports-grid">
                {reportCards.map((report, i) => (
                    <div className="report-card" key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{report.icon}</span> {report.title}
                            </h3>
                            <Button variant="ghost" size="sm">Export ↓</Button>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '16px' }}>{report.desc}</p>
                        <div className="chart-placeholder">
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '32px', marginBottom: '4px' }}>📈</p>
                                <p>{report.title} Visualization</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reports */}
            <div className="card" style={{ marginTop: '32px' }}>
                <div className="card-header">
                    <h3 className="card-title">Generated Reports</h3>
                    <Button variant="primary" size="sm">+ Generate New</Button>
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>No generated reports available.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
