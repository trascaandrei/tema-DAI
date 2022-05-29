const request = require('request');
const db = require("../models");

var ObjectId = require('mongodb').ObjectID;

const User = db.user;
const Document = db.document

exports.generateForm = (req, res) => {
  const formId = req.params['formId']
  console.log(`Generate form called with id: ${formId}`)
  const requestOptions = {
    url: `http://localhost:8080/api/form/${formId}`,
    method: 'GET',
    json: {},
    qs: {
      offset: 20
    }
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    } else if (response.statusCode === 200) {
      const fileName = 'output.xlsx';
      const ws = XLSX.utils.json_to_sheet(body);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'output');
      XLSX.writeFile(wb, fileName);
      return res.status(200).send({ message: "Form generated!" });
    } else {
      console.log(response.statusCode);
      res.status(response.statusCode).send({ message: response.body });
      return;
    }
  });
};

exports.getForms = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    var documentsIds = [];
    for (let i = 0; i < user.documents.length; i++) {
      documentsIds.push(ObjectId(user.documents[i]._id));
    }

    Document.find({
      '_id': { $in: documentsIds}
  }, function(err, docs){
    res.status(200).send({
      documents: docs
    });
  });
  });
}

exports.getFormById = (req, res) => {
  Document.findById(req.params["formId"]).exec((err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!doc) {
      return res.status(404).send({ message: "Document Not found." });
    }
    
    res.status(200).send({
      formular: {
        doc
      }
    })
  })
}

exports.deleteFormById = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.documents.remove({_id:ObjectId(req.params["formId"])})
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    })
  })

  Document.findByIdAndRemove(req.params["formId"]).exec((err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!doc) {
      return res.status(404).send({ message: "Document Not found." });
    }
    
    res.status(200).send({
      message: "Document deleted"
    })
  })
}

exports.addForm = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    var d_t = new Date()
    let year = d_t.getFullYear();
    let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
    let day = ("0" + d_t.getDate()).slice(-2);
    let hour = d_t.getHours();
    let minute = d_t.getMinutes();

    var epoch = Date.now()
    const title = "Document_" + year + "-" + month + "-" + day + "_" + hour + ":" + minute

    const newDoc = new Document({
      title: title,
      createdAt: epoch,
      name: user.username,
      formData : req.body.formular
    })

    newDoc.save((err, newDoc) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      user.documents.push(newDoc._id)
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send({
          formular: newDoc
        })
      })
    })
  })
}

exports.updateForm = (req, res) => {
  Document.findByIdAndUpdate(req.params['formId'], { formData: req.body.formular},
                            function (err, doc) {
    if (err){
      res.status(500).send({ message: err });
    }
    else{
      res.status(200).send({
        message: "Document Updated"
      })
    }
  })
}
