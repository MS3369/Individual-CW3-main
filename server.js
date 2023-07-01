const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const { ObjectId, MongoClient } = require('mongodb');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

const uri = "mongodb+srv://sualehkhalifa:1234shah@cluster0.e0jwpze.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        const db = client.db('LessonClub');
        console.log("Database connected");

        // Create Lesson Model
        const Lesson = db.collection('lesson');
        const Order = db.collection('order');

        // Fetch all lessons
        app.get('/lesson', (req, res) => {
            Lesson.find({}).toArray((err, lessons) => {
                if (err) {
                    res.status(500).send('Error retrieving lessons from the database');
                } else {
                    res.json(lessons);
                }
            });
        });

        // Fetch all documents from a collection
        app.get('/collection/:collectionName', (req, res, next) => {
            const collection = db.collection(req.params.collectionName);
            collection.find({}).toArray((err, results) => {
                if (err) return next(err);
                res.send(results);
            });
        });

        // Insert a document into a collection
        app.post('/collection/:collectionName', (req, res, next) => {
            const collection = db.collection(req.params.collectionName);
            collection.insertOne(req.body, (err, result) => {
                if (err) return next(err);
                res.send({ message: 'success' });
            });
        });

        // Update a document in a collection
        app.put('/collection/:collectionName/:id', (req, res, next) => {
            const collection = db.collection(req.params.collectionName);
            const id = new ObjectId(req.params.id);
            collection.updateOne({ _id: id }, { $set: req.body }, { safe: true, multi: false },
                (err, result) => {
                    if (err) return next(err);
                    res.send(result.modifiedCount === 1 ? { msg: 'success' } : { msg: 'error' });
                });
        });

        // Search for lessons by keyword
        app.get('/collection/lesson/search', (req, res, next) => {
            const queryStr = req.query.key_word;
            Lesson.find({
                $or: [
                    { subject: { $regex: queryStr, $options: 'i' } },
                    { location: { $regex: queryStr, $options: 'i' } }
                ]
            }).toArray((err, lessons) => {
                if (err) {
                    res.status(500).send('Error retrieving lessons from the database');
                } else {
                    res.json(lessons);
                }
            });
        });

        // Insert an order
        app.post('/collection/orders', (req, res) => {
            const order = req.body;

            Order.insertOne(order, (err, result) => {
                if (err) {
                    console.error('Error inserting order:', err);
                    res.status(500).send('Error inserting order');
                    return;
                }

                res.json({ message: 'Order inserted successfully' });
            });
        });

        // Serve static files
        app.use(express.static(path.join(__dirname, 'static')));

        // Handle 404 - File not found
        app.use((req, res) => {
            res.status(404);
            res.send("File not found");
        });

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log("App running on port", port);
        });
    }
});
