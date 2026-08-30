CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(100) NOT NULL,
    issue_description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Received'
        CHECK (status IN (
            'Received',
            'In Progress',
            'Ready',
            'Completed'
        )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);