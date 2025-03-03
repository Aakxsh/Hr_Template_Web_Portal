const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;


app.post('/api/template/create', (req, res) => {
    // Handle template creation logic
    const { name, content } = req.body;  // Example: receiving data
    console.log('Creating template:', name, content);

    // Add logic to save the template (DB call, etc.)

    res.status(201).json({ message: 'Template created successfully' });
});
const server = http.createServer(app)


server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});