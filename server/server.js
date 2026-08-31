const express = require("express");
const app = express();
const pool = require("./db")

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("RepairDesk API is working")
});


app.get("/api/tickets", async (request, response) => {
    try{
        const result = await pool.query(
            "SELECT * FROM tickets ORDER BY created_at DESC"
        );
        response.status(200).json(result.rows);
        console.log("get requests followed through ")
        
    }
    catch (error) {
        console.error("Error fetching tickets", error);
        response.status(500).json({
            error: "Failed to fetch tickets"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});