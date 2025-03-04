const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const cors = require('cors');
const hrRoutes = require('./routes/hr.routes')
const adminRoutes = require('./routes/admin.routes')
const connectToDb = require('./db/db')
connectToDb();


app.use(cors());
app.use(express.json());

// Routes
const templateRoutes = require('./routes/template.routes');  // Make sure this path is correct
app.use('/api/template', templateRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Webportal is running');
});

app.use('/hr', hrRoutes)
app.use('/admin', adminRoutes)

module.exports = app;





