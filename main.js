const express = require('express');
const app = express();

//oma moduuli
const admin = require('./models/admin');

const bodyParser = require('body-parser');

const session = require('express-session');

const crypto = require('crypto');

//oma moduuli
const mailer = require('./models/mailer');

const portti = 3113;



//sessio asetukset
app.use(session({ 
                secret : 'TamaOnkinTosiHankalaArvata1DLolOnpas111Hauskss7',
                resave :  false,
                saveUninitialized : false }))

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended' : true}));

//ejs
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static('public'));


app.get('/', (req, res) => {

    res.render('index', {'kayttaja' : req.session.kayttaja});
})


app.get('/blogi', (req, res) => {

    admin.haeBlogitekstit((tekstit) => {

        res.render('blogi', {'kayttaja' : req.session.kayttaja, 'tekstit' : tekstit, 'virhe' : null});
    })

})


//tähän ei ole sivustolla suoraa linkkiä koska vain adminin käyttöön
app.get('/yllapito', (req, res) => { //olisi voinut nimetä varmaan myös loginiksi..
    if(!req.session.loggedIn) { //sessiomuuttujalla tarkistetaan onko kirjautuneena kukaan
        res.render('yllapito', {'virhe' : null});
    }else{
        res.redirect('/adminpage');
    }

})


app.post('/login', (req, res) => {
    
    //haetaan kannasta
    admin.haeKayttaja(req.body.tunnus, (tunnus) => {

        //annettu salasana hashiksi
        let hash = crypto.createHash("SHA512").update(req.body.salasana).digest("hex");

        if(tunnus[0]) { //mysql query palauttaa aina arrayn, vaikka tyhjän
                if (hash == tunnus[0].salasana) {
                    console.log("Salasana oikein")
                    req.session.loggedIn = true; //asetetaan kirjautuminen voimaan
                    req.session.kayttaja = req.body.tunnus; //kirjautuneen käyttäjän tunnus talteen
                    res.redirect('/adminpage');
                }else{
                    req.session.loggedIn = false;
                    res.render('yllapito', {'virhe' : 'Virheellinen käyttäjätunnus tai salasana'});
                }
        }else {
            res.render('yllapito', {'virhe' : 'Virheellinen käyttäjätunnus tai salasana'});
        }

    })

})


app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.kayttaja = null;

    res.redirect('/');
})


app.get('/lisaauusi', (req, res) => {
    if(!req.session.kayttaja) {
        res.redirect('/');
    } else {
        res.render('lisaauusi', {'kayttaja' : req.session.kayttaja, 'virhe' : null});
    }

})

app.post('/lisaauusi', (req, res) => {

    admin.lisaaBlogiTeksti(req.body, (virhe) => {
        if (virhe) {
            res.render('lisaauusi', {'kayttaja' : req.session.kayttaja, 'virhe' : virhe});
        } else {
            res.redirect('/blogi');
        }
    })

})


app.get('/adminpage', (req, res) => {
    if(!req.session.loggedIn) { //jos kukaan ei ole kirjautuneen, ohjataan login-ruutuun
        res.redirect('/yllapito');
    } else {
        res.render('adminpage', {'kayttaja' : req.session.kayttaja})
    }

})


app.get('/lomake', (req, res) => {
    res.render('lomake', {'kayttaja' : null, 'ilmoitus' : null})
})


app.post('/lomake', (req, res) => {
    mailer.lahetaEmail(req.body, (ilmoitus) => {
        res.render('lomake', {'kayttaja' : null, 'ilmoitus' : ilmoitus})
    })
})

app.listen(portti, () => {
    console.log(`Palvelin käynnissä portissa ${portti}`);
})