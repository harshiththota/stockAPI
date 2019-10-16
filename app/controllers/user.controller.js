const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.password) {
    return res.status(400).send({
      message: "userId or password missing"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    userId: req.body.userId,
    password: req.body.password,
  });

  // Save User in the database
  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });

};

// Find a single user with a userId
exports.findOne = (req, res) => {
  if (!req.params.userId) {
    return res.status(400).send({
      message: "userId can not be empty"
    });
  }

  User.find({userId: req.params.userId})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    });

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name || !req.params.userId) {
    return res.status(400).send({
      message: "name or userId can not be empty"
    });
  }

  // Find user and update it with the request body
  User.findOneAndUpdate({userId: req.params.userId}, {
    name: req.body.name
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findOneAndRemove({ userId: req.params.userId })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });
};
