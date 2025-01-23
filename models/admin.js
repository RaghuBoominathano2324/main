import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminModel = mongoose.model('admins', AdminSchema);
export default AdminModel;
