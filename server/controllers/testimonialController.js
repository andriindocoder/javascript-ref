const Testimonials = require('../models/Testimonials');

exports.displayTestimonials = (req, res) => {
    Testimonials.findAll()
      .then(testimonials => res.render('testimonials', {
        pageTitle: 'Testimonials',
        testimonials
      }))
  }

exports.createTestimonial = (req, res) => {
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
  }