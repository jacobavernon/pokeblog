exports.index = function(req, res, next) {
  res.render("index", { title: "Datte-Bayo!" });
  req.flash('success', 'Good Job')
  req.flash('error', 'OOPSIE')
};
