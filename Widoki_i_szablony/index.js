const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const trucksData = {
    star28: {
        name: 'Star 28',
        power: '140 KM',
        torque: '390 Nm'
    },
    star29: {
        name: 'Star 29',
        power: '160 KM',
        torque: '420 Nm'
    }
};

app.get("/", async (req, res) => {
    try {
        // Renderowanie szablonu EJS i przekazanie danych
        res.render('index', { trucksData: trucksData });
    } catch (error) {
        // Obsługa błędów
        console.error("Wystąpił błąd:", error);
        res.status(500).send("Wystąpił błąd podczas przetwarzania żądania.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})