const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const travelController = require('../controllers/travelController');
const testimonialController = require('../controllers/testimonialController');

module.exports = function () {
  //homepage url
  router.get('/', homeController.homeInformation);
  router.get('/about', aboutController.aboutInformation);
  router.get('/travels', travelController.displayTravels);
  router.get('/travels/:id', travelController.displayTravel);
  router.get('/testimonials', testimonialController.displayTestimonials);
  router.post('/testimonials', testimonialController.createTestimonial);

  return router;
};
