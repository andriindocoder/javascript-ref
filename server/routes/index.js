const express = require('express');
const router = express.Router();

const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');

module.exports = function () {
  //homepage url
  router.get('/', (req, res) => {
    const promises = [];

    promises.push(Travels.findAll({limit: 3}));
    promises.push(Testimonials.findAll({limit: 3}));

    const result = Promise.all(promises);

        result.then(result => res.render('index', {
          pageTitle: 'Home',
          className: 'home',
          travels: result[0],
          testimonials: result[1]
        }))
        .catch(error => console.log(error))
  });

  router.get('/about', (req, res) => {
    res.render('about', {
      pageTitle: 'About Us',
    });
  });

  router.get('/travels', (req, res) => {
    Travels.findAll().then((travels) =>
      res.render('travels', {
        pageTitle: 'Upcoming Travels',
        travels,
      })
    );
  });

  router.get('/travels/:id', (req, res) => {
    Travels.findByPk(req.params.id)
      .then(travel => res.render('travel', {
        travel
      }))
  });

  router.get('/testimonials', (req, res) => {
    Testimonials.findAll()
      .then(testimonials => res.render('testimonials', {
        pageTitle: 'Testimonials',
        testimonials
      }))
  });

  router.post('/testimonials', (req, res) => {
    let {name, email, message} = req.body;

    //Validate the form
    let errors = [];

    if(!name) {
      errors.push({'message': 'Name is required'})
    }

    if(!email) {
      errors.push({'message': 'Email is required'})
    }

    if(!message) {
      errors.push({'message': 'Message is required'})
    }

    if(errors.length > 0){
      res.send('jerapah')
      Testimonials.findAll()
        .then(testimonials => res.render('testimonials', {
          pageTitle: 'Testimonials',
          errors,
          name,
          email,
          message,
          testimonials
        }))
    }else{
      Testimonials.create({
        name,
        email,
        message
      })
      .then(() => res.redirect('/testimonials'))
      .catch((e) => console.log(e))
    }
  });

  return router;
};
