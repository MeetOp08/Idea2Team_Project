const axios = require('axios');

const BASE_URL = 'http://localhost:1337/api';

async function runTests() {
    console.log("=== IDEA2TEAM AUTOMATED E2E API DIAGNOSTICS ===");
    let failCount = 0;

    const test = async (name, promise) => {
        try {
            await promise;
            console.log(`✅ PASS: ${name}`);
        } catch (err) {
            console.log(`❌ FAIL: ${name}`);
            console.log(`   └─ Details: ${err.message}`);
            failCount++;
        }
    };

    // 1. Database Connection & System Health
    await test("Backend Server is Online", axios.get("http://localhost:1337/")); // Will 404 but proves server is accepting connections
    
    // 2. Fetch Projects Status
    await test("Fetch System Active Projects", axios.get(`${BASE_URL}/projects`));

    // 3. User Login Check (Founder)
    let founderId = 21;
    await test("Founder Login Authentication", axios.post(`${BASE_URL}/login`, { email: 'Meet@gmail.com', password: 'Meet@gmail' }));

    // 4. Test Freelancer Login
    let freelancerId = 22;
    await test("Freelancer Login Authentication", axios.post(`${BASE_URL}/login`, { email: 'smit@gmail.com', password: 'Smit@gmail' }));

    // 5. Check Workspaces
    let workspaceId = null;
    await test("Fetch Founder Workspaces", axios.get(`${BASE_URL}/project/workspaces/36`).then(res => {
        if(res.data.data && res.data.data.length > 0) {
            workspaceId = res.data.data[0].workspace_id;
        }
    }));

    if (workspaceId) {
        // 6. Test Team Members Route
        await test("Fetch Workspace Members", axios.get(`${BASE_URL}/workspace/members/${workspaceId}`));

        // 7. Test Chat History Route
        await test("Fetch Chat History", axios.get(`${BASE_URL}/chat/${workspaceId}`));

        // 8. Test Kanban Tasks Route
        await test("Fetch Kanban Tasks", axios.get(`${BASE_URL}/tasks/${workspaceId}`));

        // 9. Test File Vault Route
        await test("Fetch Workspace File Vault", axios.get(`${BASE_URL}/workspace/files/${workspaceId}`));

    } else {
        console.log("⚠️ SKIP: Workspace tests bypassed because Project 36 has no assigned workspace.");
    }

    console.log("\n============================================");
    if (failCount === 0) {
        console.log("🟢 SYSTEM HEALTH: EXCELLENT. All verified APIs are operational.");
    } else {
        console.log(`🔴 SYSTEM HEALTH: POOR. ${failCount} API Tests Failed.`);
    }
}

runTests();
