const Testimonials = require('../models/Testimonials');

exports.displayTestimonials = async (req, res) => {
    const testimonials = await Testimonials.findAll();
    res.render('testimonials', {
      pageTitle: 'Testimonials',
      testimonials
    })
  }

exports.createTestimonial = async (req, res) => {
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
      const testimonials = await Testimonials.findAll();
      res.render('testimonials', {
        pageTitle: 'Testimonials',
        errors,
        name,
        email,
        message,
        testimonials
      })
    }else{
      const result = await Testimonials.create({
        name,
        email,
        message
      })
      if(result){
        res.redirect('/testimonials');
      }else{
        console.log('Something went wrong');
      }
    }
  }