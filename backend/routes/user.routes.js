const express = require("express");
const router = express.Router();
const userModel = require("../db/Models/user.model");
const path = require("path");
const fs = require("fs");
// const createuserdasboard = require("../Createdb/userdashboard.db");

const createUser = require("../Createdb/userdb");
const cookieParser = require("cookie-parser");
const blacklistToken = require("../Createdb/blaclistdb");
router.use(cookieParser());
// const cloudinary = require("cloudinary").v2;
const authMiddleware = require("../middlewares/auth.middleware");
// const userdashboardModel = require("../db/Models/user.profile.model");
// const { upload } = require("../config/multer.config");
router.post("/register", async (req, res) => {
  const {
    fullname,
    email,
    password,
    phone,
    emgcontact,
    address,
  } = req.body;
 
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  if (!hashedPassword) {
    return res.status(500).json({ message: "Error hashing password" });
  }
  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
    phone,
    emgcontact,
    address,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ message: "User created successfully", user, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "email or password incorrect" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Email or password incorrect" });
  }
  const token = user.generateAuthToken();
 
  res.cookie("token", token);
  res.status(200).json({ message: "Login successful", user, token });
});

router.post("/logout", authMiddleware.authenticateUser, async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await blacklistToken(token);
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

router.get("/profile", authMiddleware.authenticateUser, async (req, res) => {
  const user = req.user;
  

  res.status(200).json({ user });
});
// router.post("/dashboard", authMiddleware.authenticateUser, async (req, res) => {
//   const user = req.user;

//   const existinguser = await userdashboardModel.findOne({ email: user.email });
//   if (existinguser) {
//     return res.json({ existinguser });
//   }

//   const userdashboard = await createuserdasboard({
//     fullname: {
//       firstname: user.fullname.firstname,
//       lastname: user.fullname.lastname,
//     },
//     email: user.email,
//     profilephoto: { url: "", public_id: "" },
//     expertise: "",
//     phone: "",
//     gender: "",
//     RollNo: user.RollNo,
//     Branch: user.Branch,
//   });

//   res
//     .status(201)
//     .json({ message: "userdashboard created successfully", userdashboard });
// });

// router.post(
//   "/upload",
//   authMiddleware.authenticateUser,
//   upload.single("image"),
//   async (req, res) => {
//     const user = await userdashboardModel.findOne({ email: req.user.email });

//     if (user.profilephoto && user.profilephoto.public_id) {
//       await cloudinary.uploader.destroy(user.profilephoto.public_id);
//     }
//     const imageUrl = req.file.path;
//     const publicId = req.file.filename;

//     try {
//       const updatedUser = await userdashboardModel.findOneAndUpdate(
//         { email: req.user.email },
//         { profilephoto: { url: imageUrl, public_id: publicId } },
//         { new: true }
//       );

//       if (!updatedUser) {
//         return res
//           .status(404)
//           .json({ message: "User not  found with this email" });
//       }

//       res.json({
//         message: "Profile photo updated successfully",
//         user: updatedUser,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error while updating" });
//     }
//   }
// );

// router.get("/dashboard", authMiddleware.authenticateUser, async (req, res) => {
//   const email = req.user.email;

//   const existingUserprofile = await userdashboardModel.findOne({ email });
//   if (existingUserprofile) {
//     return res.send({ existingUserprofile });
//   }
//   return res.status(404).json({ message: "profile not exist" });
// });

// router.put(
//   "/editprofile",
//   authMiddleware.authenticateUser,
//   async (req, res) => {
//     const { email, phone, RollNo, expertise, gender } = req.body;

//     const user = await userdashboardModel.findOne({ email: req.user.email });
//     if (!user) {
//       return res.status(404).json({ message: "user profile not found" });
//     }
//     const updatedProfile = await userdashboardModel.findOneAndUpdate(
//       { email: req.user.email },
//       {
//         expertise,
//         gender,
//         email,
//         phone,
//         RollNo,
//       },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Profile updated successfully", updatedProfile });
//   }
// );

module.exports = router;
