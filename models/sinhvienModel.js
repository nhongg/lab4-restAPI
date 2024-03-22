const mongoose=require('mongoose');
const SinhVienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },

});
const db2=mongoose.connection.useDb('lab4');
const sinhvien=db2.model('student',SinhVienSchema);
module.exports=sinhvien;