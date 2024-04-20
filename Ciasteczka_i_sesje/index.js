const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const app = express();
const port = 5000;

app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const carsData = {
    fiat125p: {
        name: 'Polski Fiat 125p',
        description: 'Samochód osobowy produkowany w Polsce w latach 1967–1991.'
    },
    fiat126p: {
        name: 'Polski Fiat 126p',
        description: 'Popularny mały samochód osobowy produkowany w Polsce w latach 1973–2000.'
    },
    polonez1500: {
        name: 'Polonez 1500',
        description: 'Samochód osobowy produkowany w Polsce w latach 1978–2002.'
    }
};

app.get("/", async (req, res) => {
    try {
        res.render('index', { carsData: carsData });
    } catch (error) {
        console.error("Wystąpił błąd:", error);
        res.status(500).send("Wystąpił błąd podczas przetwarzania żądania.");
    }
});

// Obsługa żądania GET na stronie preferencji
app.get("/preferences", async (req, res) => {
    try {
        // Pobranie preferencji z ciasteczek
        const preferences = req.cookies.preferences || {};
        // Renderowanie szablonu EJS preferencji i przekazanie danych
        res.render('preferences', { preferences: preferences, carsData: carsData });
    } catch (error) {
        console.error("Wystąpił błąd:", error);
        res.status(500).send("Wystąpił błąd podczas przetwarzania żądania.");
    }
});


app.post("/preferences", async (req, res) => {
    try {
        const { car, like } = req.body;
        const preferences = req.cookies.preferences || {};
        preferences[car] = like === 'true';
        res.cookie('preferences', preferences);
        res.redirect('/preferences');
    } catch (error) {
        console.error("Wystąpił błąd:", error);
        res.status(500).send("Wystąpił błąd podczas przetwarzania żądania.");
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
