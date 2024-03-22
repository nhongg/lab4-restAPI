const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const methodOverride = require('method-override');
const path=require('path');
const sinhVienRoute=require('./routes/sinhvienRoute');
const SinhVien=require('./models/sinhvienModel');

const app=express();

mongoose.connect('mongodb+srv://anhntkph42900:1234566@cluster0.tfolv4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlparser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Da ket noi thanh cong voi db');
}).catch((err)=>{
    console.error("Loi: "+ err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//put, delete
app.use(methodOverride('_method'));
//route
app.use('/sinhvien',sinhVienRoute);
//tai nguyen tinh
app.use(express.static(path.join(__dirname,'public')));

//cap nhat duong dan va upload 
const uploadsDir=path.join(__dirname,'uploads');
app.use('/uploads/',express.static(uploadsDir));
//su dung ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//xu ly yeu cau den trang chinh
app.get('/',async (req,res)=>{
    try {
        //lay danh sach
        const sinhviens = await SinhVien.find();
        //render
        res.render('index',{sinhviens: sinhviens});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
});
//xoa
app.use(bodyParser.json());
app.use((req,res,next)=>{
    if(req.query._method==='DELETE'){
        req.method='DELETE';
        req.url=req.path;
    }
    next();
});
//
app.delete('/sinhvien/:id',async (req,res)=>{
    const id=req.params.id; //lay ve id truyen tu form
    try {
        await SinhVien.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server dang chay o cong ${PORT}`);
});
