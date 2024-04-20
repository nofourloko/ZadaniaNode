const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Dane o ciężarówkach
const carsData = {
    Jelcz315m: {
        name: 'Jelcz 315M',
        image: 'jelcz315m.jpg',
        year: '1970',
        power: '180 KM'
    },
    Jelcz316: {
        name: 'Jelcz 316',
        image: 'jelcz316.jpg',
        year: '1973',
        power: '220 KM'
    },
    Jelcz317: {
        name: 'Jelcz 317 (317D)',
        image: 'jelcz317.jpg',
        year: '1976',
        power: '250 KM'
    },
    Jelczw640: {
        name: 'Jelcz W640',
        image: 'jelczw640.jpg',
        year: '1978',
        power: '200 KM'
    }
};

app.get('/truck/:car', (req, res) => {
    const carName = req.params.car;
    console.log(carName)
    if (carsData[carName]) {
        const car = carsData[carName];
        res.render('truck.ejs', {truck : car});
    } else {
        res.status(404).send('Nie znaleziono strony');
    }
});

app.get("/about", (req,res) => {
    res.render("about")
})

app.get("/contact", (req,res) => {
    res.render("contact")
})

// Nasłuchiwanie na określonym porcie
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
