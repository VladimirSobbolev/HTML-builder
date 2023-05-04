const path = require('path');
//получил модуль path
const fs = require('fs');
const {readdir} = require("fs/promises");
// const {log} = require("util");
// const { access, constants } = require('fs');
//получил модуль fs


const pathToDirectory = path.join(__dirname, 'files');
const pathToNewDirectory = pathToDirectory + '-copy';


const createNewDir = () => {
    fs.mkdir(pathToNewDirectory, {recursive: true}, err => {
if (err) {
    console.log(err)
}
        // console.log('Все папки успешно созданы');
    });

}

fs.access(pathToNewDirectory, (err) => { // проверяю наличие папки
    if (err) {
         // если ее нет создаю новую
    } else {
    fs.rm( pathToNewDirectory, //если есть то удаляю
        { recursive:true },
        (err) => {
        if(err) {
            console.error(err)
        } else {
            copyDir();
        }

        });
    }

});


async function copyDir() {
    try {
        createNewDir();
        const files = await readdir(pathToDirectory); // получаю массив с файлами

        for (const file of files) {
            const pathToFile = path.join(pathToDirectory, file); //получаю путь до файла
            const pathToNewFile = path.join(pathToNewDirectory, file);// получаю путь до ногого файла
            fs.copyFile(pathToFile, pathToNewFile, (err) => {
                if (err) {
                    console.error(err)

                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}

copyDir();

