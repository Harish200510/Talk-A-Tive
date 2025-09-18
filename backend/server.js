const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messagRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server Started on PORT ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000, //if the user not sending any message it will close the connection to save the bandwith (before closing it will wait for 60000 milli second)
  cors: {
    //it should be frontend running port
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  //Everytime person opens the app the own personal socket will be created
  //creating a separate room to chat
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  //when a new user comes in added to this particular room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined Room:" + room);
  });
});
