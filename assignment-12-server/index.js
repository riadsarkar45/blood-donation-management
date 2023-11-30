
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SCRET_KEY)
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Product server is running');
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

//assignment-12

//2P6OW5QCkxJhvEvY


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://assignment-12:2P6OW5QCkxJhvEvY@cluster0.lu7tyzl.mongodb.net/?retryWrites=true&w=majority";

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

    const database = client.db("assignment-12")
    const donorsList = database.collection("donors_list")
    const donationRequest = database.collection("donation_request")
    const districts = database.collection("districts")
    const upazillas = database.collection("upazillas")
    const users = database.collection("users");
    const blogs = database.collection("blogs");
    const payments = database.collection("payment-history");

    app.get("/donors", async (req, res) => {
      const result = await donorsList.find().toArray();
      res.send(result)
    })

    app.get("/districts", async (req, res) => {
      const result = await districts.find().toArray();
      res.send(result)
    })

    app.get("/upazillas", async (req, res) => {
      const result = await upazillas.find().toArray();
      res.send(result)
    })

    //console.log(process.env.ACCESS_TOKEN)

    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

    const verifyVolunteer = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users.findOne(query);
      const isVolunteer = user?.role === 'volunteer';
      if (!isVolunteer) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

    const getUserRole = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users.findOne(query);

      if (user) {
        req.userRole = user.role;
        next();
      } else {
        res.status(403).send({ message: 'Forbidden access' });
      }
    };

    const verifyAdminOrVolunteer = (req, res, next) => {
      const { userRole } = req;

      if (userRole === 'admin' || userRole === 'volunteer') {
        next();
      } else {
        res.status(403).send({ message: 'Forbidden access' });
      }
    };

    app.get("/all-blogs", verifyToken, getUserRole, verifyAdminOrVolunteer, async (req, res) => {
      console.log(req.query)
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const result = await blogs.find()
        .skip(page * size)
        .limit(size)
        .toArray()
      res.send(result)
    })

    app.get('/blogs-public', async(req, res) => {
      const result = await blogs.find().toArray();
      res.send(result)
    })

    app.get("/my-donation-request", verifyToken, async (req, res) => {
      console.log(req.query)
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await donationRequest.find(query)
        .skip(page * size)
        .limit(size)
        .toArray()
      res.send(result)
    })


    app.get("/req-count/", async (req, res) => {
      try {
        const email = req.query.email; // Use req.query to access query parameters
        const query = { email: email }; // Construct a query object
        const result = await donationRequest.countDocuments(query);
        res.json({ count: result });
      } catch (error) {
        console.error("Error fetching document count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });




    app.patch('/all-blogs/:id', verifyToken, getUserRole, verifyAdminOrVolunteer, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          status: updatedService.actionType,
          isPublished: updatedService.publishTime,
        }
      }
      const result = await blogs.updateOne(filter, user, options);
      res.send(result)
    })


    app.patch('/user-update/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedUser = req.body;
      const user = {
        $set: {
          name: updatedUser.name,
          bloodGroup: updatedUser.bloodGroup,
          district: updatedUser.district,
          upozila: updatedUser.upozila,
          image: updatedUser.image
        }
      }
      const result = await users.updateOne(filter, user, options);
      res.send(result)
    })

    


    app.get("/users", verifyToken, async (req, res) => {
      console.log(req.query)
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const result = await users.find()
        .skip(page * size)
        .limit(size)
        .toArray()
      res.send(result)
    })

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await users.findOne(query)
      res.send(result)
    })




    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await users.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
      res.send({ token })
    })

    app.get('/donors/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = donorsList.find(query);

      const results = await cursor.toArray();

      res.send(results);
    });




    app.get("/requests", verifyToken, verifyAdmin, verifyVolunteer, async (req, res) => {
      const result = await donationRequest.find().toArray();
      res.send(result)
    })


    app.get("/requests-public", async (req, res) => {
      const result = await donationRequest.find().toArray();
      res.send(result)
    })



    app.delete("/donors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donorsList.deleteOne(query);
      res.send(result)
    })

    app.delete("/delete-user/:id", verifyToken, verifyAdmin, async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await users.deleteOne(query)
      res.send(result)
    })

    app.get("/donation-detail/:id", async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donationRequest.findOne(query);
      res.send(result)
    })

    //admin actions


    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existUser = await users.findOne(query);
      if (existUser) {
        return res.send({ message: 'userExist', InsertedId: null });
      }
      const result = await users.insertOne(user)
      res.send(result)
    })

    // pagination

    app.get("/userCount", async (req, res) => {
      const count = await users.estimatedDocumentCount();
      res.send({ count })
    })

    app.get("/blogsCount", async (req, res) => {
      const count = await blogs.estimatedDocumentCount();
      res.send({ count })
    })

    app.post("/blogs", verifyToken, async (req, res) => {
      const products = req.body;
      const result = await blogs.insertOne(products);
      res.send(result);
    })

    app.delete('/delete-blog/:id', verifyToken, verifyAdmin, async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await blogs.deleteOne(query);
      res.send(result)
    })

    app.post("/donation/request", verifyToken, async (req, res) => {
      const request = req.body;
      const result = await donationRequest.insertOne(request);
      res.send(result)
    })


    app.get("/all-donation", verifyToken, async (req, res) => {
      const result = await donationRequest.find().toArray();
      res.send(result)
    })

    app.patch('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          status: updatedService.actionType,
        }
      }
      const result = await users.updateOne(filter, user, options);
      res.send(result)
    })

    app.patch('/users-role/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          role: updatedService.actionType,
        }
      }
    const result = await users.updateOne(filter, user, options);
    res.send(result)
  })

    app.patch('/donation-status/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      //const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          status: updatedService.status,
        }
      }
      const result = await donationRequest.updateOne(filter, user);
      res.send(result)
    })

    app.patch('/donation-status-pub/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      //const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          status: updatedService.status,
        }
      }
      const result = await donationRequest.updateOne(filter, user);
      res.send(result)
    })

    app.patch("/edit-donation/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      //const options = { upsert: true };
      const updatedService = req.body;
      const user = {
        $set: {
          name: updatedService.name,
          email: updatedService.email,
          recipentName: updatedService.recipentName,
          district: updatedService.district,
          upozila: updatedService.upozila,
          location: updatedService.location,
          fullAdress: updatedService.fullAdress,
          date: updatedService.date,
          time: updatedService.time,
          bloodGroup: updatedService.bloodGroup,
          status: updatedService.status,
        }
      }
      const result = await donationRequest.updateOne(filter, user);
      res.send(result)
    })


    app.get("/edit-donation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donationRequest.findOne(query);
      res.send(result)
    })

    app.delete('/donation-delete/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await donationRequest.deleteOne(query)
      res.send(result)
    })

    app.get("/users/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await users.find(query).toArray();
      res.send(result)
    })

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await users.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })

    app.get('/users/volen/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await users.findOne(query);
      let volunteer = false;
      if (user) {
        volunteer = user?.role === 'volunteer';
      }
      res.send({ volunteer });
    })

    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    });

    //payment

    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await payments.insertOne(payment)
      res.send({ paymentResult });
    })

    app.get("/payment-history", verifyToken, verifyAdmin, async (req, res) => {
      const result = await payments.find().toArray();
      res.send(result);
    })

    app.get('/admin-stats', async (req, res) => {
      const totalDonor = await users.estimatedDocumentCount();
      const donationRequests = await donationRequest.estimatedDocumentCount();
      const donations = await payments.estimatedDocumentCount();
      const result = await payments.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: '$price'
            }
          }
        }
      ]).toArray();
      const revenue = result.length > 0 ? result[0].totalRevenue : 0;
      res.send({ totalDonor, donationRequests, donations, revenue })
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
