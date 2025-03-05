
// Register Admin - Allow only 1 admin
exports.registerAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fullname, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({});
        if (existingAdmin) {
            return res.status(403).json({ message: 'Admin already exists. Only 1 admin is allowed.' });
        }

        const admin = new Admin({ fullname, email, password });
        await admin.save();

        const token = admin.generateAuthToken();
        res.status(201).json({ token, admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) return res.status(404).json({ message: 'Invalid email or password' });

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = admin.generateAuthToken();

    res.json({ token, admin });
};
