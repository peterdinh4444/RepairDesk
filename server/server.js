const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("RepairDesk API is working")
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});