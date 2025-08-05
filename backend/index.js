const cors = require("cors");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");

const app = express();
const port = 6600;

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static('uploads'))


const uri = "mongodb+srv://roshandevtp:AfYkv3oQliPWQnCv@cluster0.0val66j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri)

const upload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            fileName: function (req, file, cb) {
                cb(null, `${Date.now()} - ${file.originalname}`);
            }
        },
    )
})


async function run() {
    await client.connect();

    try {
        const fakeApiCollection = client.db("fakeapi").collection("products");

        app.get('/fakeapi/products', async (req, res) => {
            const response = await fakeApiCollection.find().toArray();
            res.status(200).send(response);
        });

        /* app.post('/fakeapi/products', async (req, res) => {
            const data = req.body;
            await fakeApiCollection.insertMany(data, { ordered: true });
        }); */

        app.post('/fakeapi/products', upload.single('image'), async (req, res) => {
            const data = req.body;
            const imageSrc = req.file;
            console.info("File info :",imageSrc);

            const response = await fakeApiCollection.insertOne({ ...data, imageSrc });
            console.info(response);
            res.status(201).json({ ...data, imageSrc });
        });

    } catch (error) {
        res.json({ error: ` Error in fakeApiCollection : ${error.message}` })
    }

    try {
        const fakeApiCartItems = client.db('fakeapi').collection('cartitems');

        app.get("/fakeapi/cartitems", async (req, res) => {
            const response = await fakeApiCartItems.find().toArray();
            res.status(200).send(response);
        });

        app.post("/fakeapi/cartitems", async (req, res) => {
            const data = req.body;
            console.info("Added Cart Item Obj Id :", new ObjectId(data._id))
            const response = await fakeApiCartItems.insertOne({ ...data, _id: new ObjectId(data._id) });
            res.status(201).json(data)
        });

        app.delete('/fakeapi/cartitems/:id', async (req, res) => {
            const id = req.params.id;
            console.info("id", id)
            const response = await fakeApiCartItems.deleteOne({ _id: new ObjectId(id) });
            console.info(response)
            res.status(200).json(id);
        })

    } catch (error) {
        res.json({ error: `Error in FakeApi Cart Items : ${error.message}` })
    }

    await client.db("fakeapi").command({ ping: 1 });
    console.info("MongoDB Connected")
}

run();

app.listen(port, () => console.info("Express started at http://localhost:", port));