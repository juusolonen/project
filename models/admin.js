const mysql = require('mysql');

//yhteysasetukset
const yhteys = mysql.createConnection({
                            'host'      : 'localhost',
                            'user'      : 'root',
                            'password'  : '',
                            'database'  : 'harkkasivu'
});

//yhteys tietokantaan
yhteys.connect(() => {
    console.log('Yhteys tietokantaan avattu')
})

//exportattavat metodit
module.exports = {
        'haeKayttaja' : (kayttaja, callback) => {
            yhteys.query('SELECT * FROM tunnukset WHERE tunnus = ?', [kayttaja], (err, tunnus) => {
                if (err) {
                    callback(null);
                }else{
                    callback(tunnus);
                }
            })
        },
        'haeBlogitekstit' : (callback) => {
            yhteys.query('SELECT * FROM blogi', (err, tekstit) => {
                
                if (err) {
                    callback(null);
                } else {
                    callback(tekstit);
                }
            })
        },
        'lisaaBlogiTeksti' : (blogikirjoitus, callback) => {

            let otsikko = mysql.escape(blogikirjoitus.otsikko);
            let teksti = mysql.escape(blogikirjoitus.teksti);
           
            yhteys.query(`INSERT INTO blogi (otsikko, sisalto) VALUES (${otsikko}, ${teksti})`, (err) => {
                if (err) {
                    callback('Kirjoituksen lisäys epäonnistui!')
                } else {
                    callback(null);
                }
            })
        }
}