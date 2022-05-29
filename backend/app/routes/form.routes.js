const controller = require("../controllers/form.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/form/generate/:formId',  [authJwt.verifyToken], controller.generateForm);

  app.get('/api/form/',  [authJwt.verifyToken], controller.getForms);

  app.get('/api/form/:formId', [authJwt.verifyToken], controller.getFormById)

  app.delete('/api/form/:formId', [authJwt.verifyToken], controller.deleteFormById)

  app.post('/api/form/add', [authJwt.verifyToken], controller.addForm)

  app.post('/api/form/update/:formId', [authJwt.verifyToken], controller.updateForm)
};
