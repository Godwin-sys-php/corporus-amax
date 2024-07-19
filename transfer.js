const fs = require('fs');
const csv = require('csv-parser');

const sqlFile = fs.createWriteStream('new.sql');

fs.createReadStream('liste_produit_amax.csv')
  .pipe(csv({separator: ';'}))
  .on('data', (row) => {
    // Créer la requête INSERT pour chaque ligne

      const insertQuery = `INSERT INTO products SET categoryId = 1, categoryName = 'Parfum', name = "${row["nom"].trim()}", barcode = '${row["code"].trim()}', unit='Bouteille', isSellable = 1, isVersatile = 1, price = ${Number(row["price"])}, buyPrice = 0, inStock = NULL, depotStock = 0, hasLink = 0, timestamp = 1721377656;\n`;
      
      // Écrire la requête dans le fichier SQL
      sqlFile.write(insertQuery);
  })
  .on('end', () => {
    console.log('CSV file successfully processed. SQL queries written to boissons.sql');
  });
