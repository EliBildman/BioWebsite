let fs = require('fs');

fs.readdir('public/art/photos/bitb', (err, items) => {
    console.log(items);
})