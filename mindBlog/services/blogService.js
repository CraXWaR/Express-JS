const Blog = require('../models/Blog');
const User = require('../models/User');

async function getAllBlogs() {
    return await Blog.find({}).lean();
}

function createBlog(blog) {
    return Blog.create(blog);
}

async function getBlogById(id) {
    return await Blog.findById(id).lean().populate({ path: 'followUsers', select: 'username' });
}

async function deleteBlog(id) {
    return await Blog.findByIdAndRemove(id);
}

async function editBlog(id, data) {
    const existingBlog = await Blog.findById(id);

    existingBlog.title = data.title;
    existingBlog.blogImg = data.blogImg;
    existingBlog.blogContent = data.blogContent;
    existingBlog.blogCategory = data.blogCategory;

    return existingBlog.save();
}

async function followBlog(blogId, userId) {
    const blog = await Blog.findById(blogId);
    blog.followList.push(userId);
    blog.followUsers.push(userId);
    userId.followingBlogs++
    await blog.save();
}


module.exports = {
    getAllBlogs,
    createBlog,
    getBlogById,
    deleteBlog,
    editBlog,
    followBlog
}