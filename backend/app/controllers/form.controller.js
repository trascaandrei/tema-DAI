const request = require('request');

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
