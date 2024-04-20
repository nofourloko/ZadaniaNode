const express = require('express')
const port = '5000'
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.post("/formHandling", (req, res) => {
    let {bok1, bok2, bok3} = req.body;

    bok1 = parseInt(bok1);
    bok2 = parseInt(bok2);
    bok3 = parseInt(bok3);

    const objetosc = bok1 * bok2 * bok3;
    const polePowierzchniBocznej = 2 * (bok1 * bok2) + 2 * (bok2 * bok3) + 2 * (bok1 * bok3);
    const dlugoscKrawedzi = 4 * bok1 + 4 * bok2 + 4 * bok3;

    const data = {
        objetosc: objetosc,
        polePowierzchniBocznej: polePowierzchniBocznej,
        dlugoscKrawedzi: dlugoscKrawedzi
    };

    res.render('results', {data: data});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})