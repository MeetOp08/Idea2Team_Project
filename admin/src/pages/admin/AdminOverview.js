import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/cards/StatsCard';

const AdminOverview = () => {
    return (
        <DashboardLayout role="admin">
            <div className="page-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Platform overview and key metrics at a glance.</p>
                </div>
            </div>

            <div className="stats-grid">
                {/* Stats will be dynamically fetched here */}
                {/* Remove dummy stats usage */}
            </div>

            <div className="content-grid">
                <div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Platform Analytics</h3>
                        </div>
                        <div className="chart-placeholder" style={{ height: '300px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '40px', marginBottom: '8px' }}>📈</p>
                                <p>Revenue & User Growth Chart</p>
                                <p style={{ fontSize: '12px', marginTop: '4px' }}>Interactive chart visualization area</p>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Project Distribution</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            {/* Dynamic project distribution logic to be added */}
                            <p style={{ color: 'var(--gray-500)', fontSize: '14px', width: '100%', textAlign: 'center', padding: '20px 0' }}>No project distribution data available.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Recent Activity</h3>
                        </div>
                        <div className="activity-list" style={{ padding: '20px', textAlign: 'center' }}>
                            <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>No recent activity to show.</p>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Quick Stats</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {/* Dynamic fast stats logic to be added */}
                            <p style={{ color: 'var(--gray-500)', fontSize: '14px', width: '100%', textAlign: 'center' }}>No stats available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminOverview;
