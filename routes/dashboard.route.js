const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { dashboardModel } = require('../models/dashboard.model');

const dashboardRouter = express.Router();
dashboardRouter.use(auth)

dashboardRouter.get("/", async (req, res) => {
    try {
        const all = await dashboardModel.find({});
        res.json({ msg: "All blogs", Blogs: all })
    } catch (error) {
        console.log(error);
    }

})

dashboardRouter.post("/blogs", async (req, res) => {
    try {
        const employe = new dashboardModel(req.body)
        await employe.save();
        res.json({ msg: "New Blog created", Blogs: req.body })
    } catch (err) {
        res.json({ msg: "Error while creating employe", error: err.message })
    }
})


dashboardRouter.get('/api/blogs', async (req, res) => {
    try {
        const titleToSearch = req.query.title;
        const blogs = await dashboardModel.find({ title: titleToSearch });

        if (blogs.length === 0) {
            res.status(404).json({ msg: 'No blogs found with the specified title.' });
        } else {
            res.json({ msg: 'Blogs found with the specified title:', blogs });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Error while searching for blogs', error: err.message });
    }
});




dashboardRouter.patch("/update/:blogID", async (req, res) => {
    const userIDinUserDoc = req.body.userId;
    console.log(userIDinUserDoc, "a")
    const { blogID } = req.params
    console.log(req.params, "b")
    try {
        const blog = await dashboardModel.findOne({ _id: blogID })
        console.log(blog, "swdw", "c")
        const userIDinpostDoc = blog.userId;
        console.log(userIDinpostDoc, "d")
        if (userIDinUserDoc === userIDinpostDoc) {

            await dashboardModel.findByIdAndUpdate({ _id: blogID }, req.body)
            res.json({ msg: `${blog.name} has been updated` })
        } else {
            res.json({ msg: "Not Authorized!!" })
        }
    } catch (err) {
        res.json({ error: err })
    }
})


dashboardRouter.put('/api/blogs/:id/like',async (req,res)=>{
    try {
        const Like=req.params.id;
        const blog=await dashboardModel.findById(Like);
        if(!blog){
            res.status(404).json({msg:"Blog not Found"});
        }else{
            blog.like.push(Like);
            await blog.save();
            res.json({msg:"You have successfully Liked"})            
        }
    } catch (error) {
        
    }
})

dashboardRouter.put('/api/blogs/:id/comment',async (req,res)=>{
    try {
        const Like=req.params.id;
        const blog=await dashboardModel.findById(Like);
        if(!blog){
            res.status(404).json({msg:"Blog not Found"});
        }else{
            blog.like.push(Like);
            await blog.save();
            res.json({msg:"You have successfully Commented"})            
        }
    } catch (error) {
        
    }
})




dashboardRouter.delete("/delete/:blogID", async (req, res) => {
    const userIDinUserDoc = req.body.userId;
    console.log(userIDinUserDoc, "a")
    const { employeeID } = req.params
    console.log(employeeID)
    try {
        const employee = await dashboardModel.findOne({ _id: employeeID })
        console.log(employee, "b")
        const userIDinpostDoc = employee.userId;
        console.log(userIDinpostDoc, "c")
        if (userIDinUserDoc === userIDinpostDoc) {

            await dashboardModel.findByIdAndDelete({ _id: employeeID }, req.body)
            res.json({ msg: `${employee.name} has been Deleted` })
        } else {
            res.json({ msg: "Not Authorized!!" })
        }
    } catch (err) {
        res.json({ error: err })
    }
})


module.exports = {
    dashboardRouter
}