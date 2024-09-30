const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/form.html')
// })

app.post("/form", (req, res) => {
    const dados = req.body
  console.log(dados);
  // res.send("Dados enviados");

  fs.access("dados.json", fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile("dados.json", "[]", (err) => {
        if (err) {
          return res.send("Erro ao criar arquivo");
        }
        salvarDados(dados, res);
      });
    } else {
      salvarDados(dados, res);
    }
  });
});

function salvarDados(dados, res) {
    fs.readFile('dados.json', (err, data) => {


        let json = []
        if (data.length > 0 ) {
            json = JSON.parse(data)
        }
    
          json.push(dados)

    fs.writeFile('dados.json', JSON.stringify(json, null, 2), (err) => {
        if (err) {
            return res.send('Erro ao salvar os dados')
        }

        res.redirect('/dados.html')
    })
  })
}


app.get("dados", (req, res) =>{
  fs.readFile("dados.json", (err, res) =>{
    if (err) {
      return res.status(500).send('Erro ao carregar os dados')
    }
  })
})

app.listen(5500);
