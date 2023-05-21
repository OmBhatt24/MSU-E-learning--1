
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentSchema = require("../models/studentModel.js");

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://0.0.0.0:27017/student");

const Student = mongoose.model("student", studentSchema);




app.route("/api")

    .get((req, res) => {

        try {
            Student.find({}, (err, students) => {
                if (!err) {
                    //console.log(students);
                    res.send(students);
                }

            });
        }
        catch (e) {
            console.log(e);
        }
    })
    .post((req, res) => {

        //our new uset JSON object is in req.body 
        console.log(req.body);
        var newPRN = req.body.prn;
        var mail = req.body.mail;
        var pass = req.body.password;
        var name = req.body.name;

       
        const newStudent = new Student({
            PRN: newPRN,
            Email: mail,
            Password: pass,
            Name: name
        });


        Student.findOne({ Email: mail }, (err, foundUser) => {
            if (!err) {

                if (foundUser) {
                    console.log("User with same mail id is already exists !!");
                } else {
                    // This will store data of new student into out mongodb database.
                    newStudent.save((err) => {
                        if (!err) {

                            res.send("Data saved !!!");
                            console.log("Data saved sucessfully !!!");
                        }
                        else
                            console.log(err);

                    });
                }
            }
        })




    });

app.post("/api/foundOne", (req, res) => {

    const emailApi = req.body.email;
    const passApi = req.body.pass;

    console.log(req.body);
    var isAuthenticate = false;


    Student.findOne({ Email: emailApi }, (err, foundUser) => {
        if (!err) {

            if (foundUser.Password === passApi) {

                isAuthenticate = true;

                res.send(isAuthenticate);
            }
            else {
                isAuthenticate = false;
                res.send(isAuthenticate);

            }
        }
    })



});


app.post("/api/course", (req, res) => {



    const course = {
        courseName: req.body.courseName,
        itemId: req.body.itemid,
        cardId: req.body.cardId,
        cardTitle: req.body.cardTitle,
        imgurl: req.body.imgurl,
        author: req.body.author
    }


    const filter = { Email: req.body.mail }


    Student.findOne({},(err,foundCard)=>{

        if(err){
            console.log(err);
        }
        else{
            console.log("I am from findOne of /api/course");
            console.log(foundCard);
        }


    });


    // as we want to update an array of object that is courses hence this syntax is used and third param new : true means after updation return that object

    const updatedStudent = Student.findOneAndUpdate(filter, { $push: { Courses: course } }, (err, data) => {
        if (err)
            console.log(err);
        else {

            //console.log(data);
            console.log("data sucessfully updated to database !!!");
        }
    });

    //console.log(updatedStudent);


    res.send("Request sucessfully recieved at api/course");

});


// used for myprofile post request method
app.post("/api/course/foundOne", (req, res) => {

    const mail = req.body.mail;
    console.log(mail);
    //console.log("I am from /course/foundOne");


    Student.findOne({ Email: mail }, (err, founduser) => {

        if (!err) {

            //console.log(founduser);

            res.send(founduser);
        }


    });


});


//used for removing particular course.
app.post("/api/course/removeCourse",(req,res)=>{

    //console.log("this is reqBody object");
    //console.log(req.body);
   
    const updateCourse = Student.findOneAndUpdate({Email : req.body.mail},{ $pull : {Courses : {cardId :req.body.cardId , itemId:req.body.itemId}}},(err,data)=>{

        if(!err){
            //console.log(data);
            res.send("Okk course removed using API");
        }
        else{
            console.log(err);
        }

    });



});




app.listen(4000, () => {
    console.log("Server has started on port 4000 for API");
});


//exporting student module so that we can use it in authentication.js middleware
module.exports = Student;

