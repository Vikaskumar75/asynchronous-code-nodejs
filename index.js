const fs = require('fs');
const supaeragent = require('superagent');

//* Callback hell

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   supaeragent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err);
//       fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
//         if (err) return console.log(err);
//       });
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   supaeragent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
//         if (err) return console.log(err);
//       });
//     })
//     .catch((err) => console.log(err));
// });

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Could not write to the file ${err}`);
      resolve('success');
    });
  });
};

//* Promises

/*
readFilePro(`${__dirname}/dogg.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return supaeragent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/dog-image.txt`, res.body.message);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));*/

//* Async/Await

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await supaeragent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`${__dirname}/dog-image.txt`, res.body.message);
    console.log('Success');
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
