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

app.get('/', (req, res) =>{
    res.send('webportal')
})


app.use('/hr', hrRoutes)
app.use('/admin', adminRoutes)

module.exports = app;

























// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const adminRoutes = require('./routes/admin.routes');

// const app = express();
// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use('/admin', adminRoutes);

// // Global error handler
// app.use((err, req, res, next) => {
//     console.error('Unhandled error:', err.message);
//     res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
