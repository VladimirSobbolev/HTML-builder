
const {readdir, stat} = require('fs/promises');

const path = require('path');


    const pathToDirectory = path.join(__dirname, 'secret-folder');
async function getInfoFiles() {
    try {
        const files = await readdir(pathToDirectory); // получаю массив с файлами

        for (const file of files) {
            const pathToFile = path.join(pathToDirectory, file); //получаю путь до файла
            const fileInfo = await stat(pathToFile); //получаю информацию о файле
            if (fileInfo.isFile()) { // проверяю что это файл
                const extension = path.extname(pathToFile); // получаю расширение
                const fileName = file.slice(0, -extension.length);
                const size = fileInfo.size + 'byte';
                const message = `${fileName} - ${extension.slice(1)} - ${size}`;
                console.log(message);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

getInfoFiles();


