
const signupData = {
    firstName: "Jean",
    lastName: "Test",
    email: `jean.test.${Date.now()}@example.com`,
    password: "Password123!",
    role: "student"
};

async function testSignup() {
    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);

        if (response.ok) {
            console.log("SUCCESS: User registered.");
        } else {
            console.log("FAILURE: " + data.message);
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
}

testSignup();
