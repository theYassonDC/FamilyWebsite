const express = require(`express`);
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', (req,res)=>{
    res.render('users/add')
})
router.post('/add', async(req,res)=>{
    let user = req.user.username
    const { title, url, principal_family, description}= req.body
    const newlink = {
        title,
        url,
        principal_family,
        description,
        user,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO Familia_links set ?', [newlink])
    req.flash('success', 'Publicación creada')
    res.redirect('/users')
})

router.get('/', isLoggedIn, async(req,res)=>{
    const users = await pool.query('SELECT * FROM Familia_links');
    res.render('layouts/listas', {users})
})
router.get('/delete/:id', isLoggedIn,async (req, res)=>{
    console.log(req.params.id);
    const { id } = req.params;
    await pool.query('DELETE FROM Familia_links WHERE ID = ?', [id]);
    req.flash('success', 'Publicación eliminada exitosamente!')
    res.redirect('/users')
})
router.get('/edit/:id', isLoggedIn,async(req, res)=>{
    const { id } = req.params;
    const lists = await pool.query('SELECT * FROM Familia_links WHERE ID = ?', [id])
    res.render('users/edit', {lists: lists[0]})
})
router.post('/edit/:id', async(req,res)=>{
    const { id } = req.params;
    const {title, url, principal_family, description} = req.body
    const newsDates = {
        title,
        url,
        principal_family,
        description
    };
    await pool.query('UPDATE Familia_links set ? WHERE  id = ?', [newsDates, id]);
    req.flash('success', 'Publicación editada exitosamente!')
    res.redirect('/users')
})
module.exports = router;