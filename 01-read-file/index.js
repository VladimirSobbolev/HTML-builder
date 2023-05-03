const fs = require('fs');
//получил модуль fs
const path = require('path')
//получил модуль path

const pathToFile = path.join('01-read-file', 'text.txt');
// собрал путь до файла
const stream = new fs.createReadStream(pathToFile);
// файл разделяется на несколько частей это сделано для того чтобы не перегружалась оперативная память при чтении больших файлов

// pipe - утекать по трубам
stream.pipe(process.stdout)
// позваляет отдавать в респонс а не наккапливать
// let fs = require('fs');
// let fileContent = fs.readFile('text.txt', 'utf8', function(error, fileContent){
//     if(error) throw error; // ошибка чтения файла, если есть
//     console.log(fileContent); // содержимое файла
// });
// если файл большой, то действия ниже успеют выполнится до того
// как будет выведено содержание файла через console.log(fileContent)