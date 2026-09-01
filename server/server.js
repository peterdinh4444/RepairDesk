const express = require("express");
const app = express();
app.use(express.json());
const pool = require("./db");

const PORT = 3000;

const VALID_STATUSES = [
    "Received",
    "In Progress",
    "Ready",
    "Completed"
];

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

app.post("/api/tickets", async(request, response) => {
    try{
        const{
            customer_name,
            device_type,
            issue_description,
            status = "Received"
        } = request.body;


        if (
            typeof customer_name !== "string" ||
            !customer_name.trim() ||
            typeof device_type !== "string" ||
            !device_type.trim() ||
            typeof issue_description !== "string" ||
            !issue_description.trim()
        ) {
            return response.status(400).json({
                error: "Customer name, device type, and issue description are required"
            });
        }


        if (!VALID_STATUSES.includes(status)) {
            return response.status(400).json({
                error: "Invalid ticket status"
            });
        }

        const result = await pool.query(
            `INSERT INTO tickets (
                customer_name,
                device_type,
                issue_description,
                status
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [customer_name.trim(), device_type.trim(), issue_description.trim(), status]
        );

        response.status(201).json(result.rows[0]);
        console.log("Ticket was succesfully created")
        



    }
    catch (error){
        console.error("Error creating ticket:", error);
        response.status(500).json({
            error: "Failed to create ticket"
        });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});