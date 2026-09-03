import "./App.css";

function App(){

  const tickets =  [
    {
      id: 1,
      customer_name: "Alex Smith", 
      device_type: "Laptop", 
      issue_description: "Will not turn on", 
      status: "Received",
    },
    {
      id: 2,
      customer_name: "Peter Dinh", 
      device_type: "Computer", 
      issue_description: "Dancing", 
      status: "Received",
    }
  ]




  return(
    <main>
      <h1>RepairDesk</h1>
      <p>Computer Repair Ticket Manager</p>
      <h2>Tickets</h2>
      <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <p>Customer: {ticket.customer_name}</p>
              <p>Device Type: {ticket.device_type}</p>
              <p>Issue Description: {ticket.issue_description}</p>
              <p>Status: {ticket.status}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}


export default App;