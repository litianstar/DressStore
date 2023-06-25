const db = require("../models");
const Products = db.products;

// add a new Product
exports.create = (req, res) => {

  // check
  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

  // Create 
  const product = new Products({

    name: req.body.name,

      description: req.body.description,

      price: req.body.price,

      category: req.body.category,

      published: req.body.published ? req.body.published : false

  });

  // Save 
  product

    .save(product)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the product."

      });

    });

};

// get all
exports.findAll = (req, res) => {

    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
   
  
    Products.find(condition)
  
      .then(data => {
  
        res.send(data);
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message:
  
            err.message || "Some error occurred while retrieving products."
  
        });
  
      });
};

// Find one by id
exports.findOne = (req, res) => {

    const id = req.params.id;

 

    Products.findById(id)
  
      .then(data => {
  
        if (!data)
  
          res.status(404).send({ message: "Not found Product with id " + id });
  
        else res.send(data);
  
      })
  
      .catch(err => {
  
        res
  
          .status(500)
  
          .send({ message: "Error retrieving Product with id=" + id });
  
      });
};

// Update by id
exports.update = (req, res) => {

    if (!req.body) {

        return res.status(400).send({
    
          message: "Data to update can not be empty!"
    
        });
    
      }
    
     
    
      const id = req.params.id;
    
     
    
      Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    
        .then(data => {
    
          if (!data) {
    
            res.status(404).send({
    
              message: `Cannot update Product with id=${id}. Maybe Product was not found!`
    
            });
    
          } else res.send({ message: "Product was updated successfully." });
    
        })
    
        .catch(err => {
            console.log(err);
    
          res.status(500).send({
    
            message: "Error updating Product with id=" + id
    
          });
    
        });
};

// Delete by id
exports.delete = (req, res) => {

    const id = req.params.id;

 

    Products.findByIdAndRemove(id)
  
      .then(data => {
  
        if (!data) {
  
          res.status(404).send({
  
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
  
          });
  
        } else {
  
          res.send({
  
            message: "Product was deleted successfully!"
  
          });
  
        }
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message: "Could not delete Product with id=" + id
  
        });
  
      });
};

// Delete all 
exports.deleteAll = (req, res) => {

    Products.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Products were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all products."

      });

    });
};

// Find all published Products
exports.findAllPublished = (req, res) => {

    Products.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });
};
