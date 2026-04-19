const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb'); // استدعاء مكتبة المونجو

const app = express();
const port = 3000;

// إعدادات قاعدة البيانات
const url = 'mongodb://admin:adminadmin@mongo';
const client = new MongoClient(url);
const dbName = 'MyFirstProject';

// دالة الاتصال بقاعدة البيانات
async function connectDB() {
    try {
        await client.connect();
        console.log('✅ متصل بنجاح بـ MongoDB');
    } catch (err) {
        console.error('❌ فشل الاتصال بالمونجو:', err);
    }
}

// تشغيل دالة الاتصال
connectDB();

// 1. المسار الأساسي لفتح الصفحة
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. مسار جديد للتأكد من الربط وعرض البيانات
app.get('/test-db', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('users');
        
        // جلب البيانات من المونجو
        const users = await collection.find({}).toArray();
        
        res.json({
            status: "Success",
            message: "الربط شغال 100%!",
            data: users
        });
    } catch (err) {
        res.status(500).json({ status: "Error", message: err.message });
    }
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`🚀 السيرفر يعمل الآن على http://localhost:${port}`);
    console.log(`🔗 اختبر الربط من هنا: http://localhost:${port}/test-db`);
});