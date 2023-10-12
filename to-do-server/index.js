import express from 'express'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



import { MongoClient, ServerApiVersion,ObjectId } from 'mongodb';
const uri = "mongodb+srv://sahariaralam8:3mFYyyumC74PnUBO@cluster0.kzarlhv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("batparsDB").collection('batpar');

    app.post('/users',async(req,res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result)
    })

    app.get('/users',async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/users/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        console.log('hitting ok',id)
        const result = await userCollection.findOne(query);
        res.send(result);
    })

    app.put('/users/:id',async(req,res)=>{
        const id = req.params.id;
        const user = req.body;
        const query = {_id: new ObjectId(id)};
        const options = { upsert: true };
        const updateUser = {
            $set:{
                name:user.name,
                email:user.email
            }
        }
        const result = await userCollection.updateOne(query,updateUser,options);
        res.send(result);
    })

    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('sahariar alam ')
})

app.listen(port,()=>{
    console.log('My server:',port)
})