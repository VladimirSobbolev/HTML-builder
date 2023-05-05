const fs = require('fs');
//получил модуль fs
// const process = require('node:process');
// добавил процесс для контроля над текущем процессом
// const readline = require('readline');
//чтение потока построчно
const path = require('path');
const {readdir} = require('fs/promises');

const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css')
//создал путь к новому файлу
const pathToCSS = path.join(__dirname, 'styles');// создал путь к файлаам css


let bundle;

//  проверяю наличие фала если файл существует, если
fs.access(pathToBundle, (err) => {
    if (err) {
        bundle = fs.createWriteStream(pathToBundle)
        //создал новый файл
    } else {
        fs.unlink(pathToBundle, (err) => {
            if (err) console.log(err); // если возникла ошибка
            else {
                bundle = fs.createWriteStream(pathToBundle)
            }
        });
    }
})







async function getCSSContent() {
    try {
        const files = await readdir(pathToCSS); // получаю массив с файлами

        for (const file of files) {
            const pathToFile = path.join(pathToCSS, file); //получаю путь до файла
            const extension = path.extname(pathToFile); // получаю расширение
            if (extension === '.css') {
                fs.readFile(pathToFile, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                    fs.appendFile(pathToBundle, data, (err) => {
                        if (err) {
                            console.error(err)
                            // return
                        }

                    })
            })
            }
        }
    } catch (err) {
        console.error(err);
    }
}

getCSSContent();