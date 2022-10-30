const { hasUser } = require('../middlewares/guards');
const { getAllBlogs, createBlog, getBlogById, deleteBlog, editBlog, followBlog } = require('../services/blogService');
const { parseError } = require('../util/parser');



const blogController = require('express').Router();

blogController.get('/catalog', async (req, res) => {
    const blogs = await getAllBlogs();

    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        blogs
    });
});

blogController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Blog',
        user: req.user
    })
});

blogController.post('/create', async (req, res) => {
    const blog = {
        title: req.body.title,
        blogImg: req.body.blogImg,
        blogContent: req.body.blogContent,
        blogCategory: req.body.blogCategory,
        owner: req.user._id,
        ownerEmail: req.user.email
    };

    try {
        await createBlog(blog);
        res.redirect('/catalog')
    } catch (error) {
        res.render('create', {
            title: 'Create Blog',
            user: req.user,
            errors: parseError(error)
        });
    }
});

blogController.get('/details/:id', async (req, res) => {
    const blog = await getBlogById(req.params.id);
    const followers = [];

    blog.followUsers.forEach(userFollow => {
        followers.push(userFollow.username)
    });

    const follwUsers = followers.join(', ');

    blog.isOwner = blog.owner.toString() == req.user?._id.toString();
    blog.isFollow = blog.followList.some((id) => id == req.user?._id);

    res.render('details', {
        title: blog.name,
        user: req.user,
        blog,
        follwUsers
    });
});

blogController.get('/details/:id/delete', async (req, res) => {
    const blog = await getBlogById(req.params.id);

    if(blog.owner.toString() != req.user?._id.toString()) {
        return res.redirect('/auth/login');
    };

    await deleteBlog(req.params.id);
    res.redirect('/catalog')
});

blogController.get('/details/:id/edit', async (req, res) => {
    const blog = await getBlogById(req.params.id);

    if(blog.owner.toString() != req.user?._id.toString()) {
        return res.redirect('/auth/login');
    };

    res.render('edit', {
        title: 'Edit Blog',
        user: req.user,
        blog
    })
});

blogController.post('/details/:id/edit', async (req, res) => {
    const blog = await getBlogById(req.params.id);

    try {
        await editBlog(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Blog',
            user: req.user,
            blog,
            errors: parseError(error)
        });
    }
});

blogController.get('/details/:id/follow', async (req, res) => {
    await followBlog(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

blogController.get('/profile', hasUser(), async (req, res) => {
    res.render('profile', {
        title: 'User Profile',
        user: req.user
    });
});

module.exports = blogController;