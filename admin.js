// CONFIG: Matches your backend server port
const API_BASE = "http://localhost:5000/api/portfolio";

// The "Courier" function
async function sendToBackend(endpoint, method, data) {
    const token = localStorage.getItem("token");

    // Demand #1: Security Check
    if (!token) {
        alert("You are not logged in!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Attaching the pass
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Server rejected the data");
        
        return await response.json();
    } catch (error) {
        console.error("Save failed:", error);
        alert("Error saving data. Check console.");
    }
}