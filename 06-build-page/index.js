const path = require('path');
const fs = require('fs');
const {readdir, stat} = require("fs/promises");
// const {log} = require("util");
// 1.Создаёт папку project-dist.
const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToAssets = path.join(__dirname, 'assets');
const pathToComponents = path.join(__dirname, 'components');

const createNewDir = (pathToNewDirectory) => {
    fs.mkdir(pathToNewDirectory, {recursive: true}, err => {
        if (err) {
            console.log(err)
        }
        // console.log('Все папки успешно созданы');
    });
}
fs.access(pathToProjectDist, (err) => { // проверяю наличие папки
    if (err) {
       // если ее нет создаю новую
        createNewBundle();
        console.log('папки не было')// сюда функционал
    } else {
        fs.rm(pathToProjectDist, //если есть то удаляю
            {recursive: true},
            (err) => {
                if (err) {
                    // console.error(err)
                } else {
                    createNewBundle();
                    // console.log('папка была но я создал новую')
                }
            });
    }
})

// 2. Заменяет шаблонные теги в файле template.html с названиями файлов из папки components (пример:{{section}}) на содержимое одноимённых компонентов и сохраняет результат в project-dist/index.html.
//создаю новый html
const pathToNewIndex = path.join(pathToProjectDist, 'index.html');
async function createNewBundle () {
    try {
        createNewDir(pathToProjectDist);//создал новую папку
        readFile(pathToTemplate); // получил данные из template.html

    } catch (err) {
        console.error(err);
    }
}

//получение данных из template
function readFile(pathToFile) {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        replaceDataAttribute(data)
})
}

// read files assets
// function getFiles (pathToDirectory) {
//     return readdir(pathToDirectory)
// }


// replace.data
async function replaceDataAttribute(dataFromTemplate) {
try {
    const files = await readdir(pathToComponents); // получаю массив с файлами
    let newData = dataFromTemplate;
    for (const file of files) {
        const pathToFile = path.join(pathToComponents, file); //получаю путь до файла
        const extension = path.extname(pathToFile);

        const fileName = `{{${file.slice(0, -extension.length)}}}`;
        fs.readFile(pathToFile, 'utf-8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }

             newData = newData.replaceAll(fileName, data);
            if(newData.includes('{{header}}')) {
                console.log('sd')
            }

            fs.writeFile(pathToNewIndex, newData, function(error){ // переписываю новый html
                if(error) throw error; // если возникла ошибка
            });
        })
        fs.readFile(pathToFile, 'utf-8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }

            newData = newData.replaceAll(fileName, data);
            if(newData.includes('{{header}}')) {
                console.log('sd')
            }

            fs.writeFile(pathToNewIndex, newData, function(error){ // переписываю новый html
                if(error) throw error; // если возникла ошибка
            });
        })

    }
}catch (err) {
        console.error(err);
    }
}

