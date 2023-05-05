const fs = require('fs');
//получил модуль fs
const process = require('node:process');
// добавил процесс для контроля над текущем процессом
const readline = require('readline');
//чтение потока построчно
const path = require('path');

const pathToFile = path.join('02-write-file', 'text.txt')
//создал путь к новому файлу


let fileText;
const message = 'Для выхода ctrl + c или exit. Напишите текст для изменения документа>';
const messageExit = 'процесс изменения документа завершён';


//  проверяю наличие фала если файл существует, если
fs.access(pathToFile, (err) => {
    if (err) {
        fileText = fs.createWriteStream(pathToFile)
        //создал новый файл
    }
})


const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(message);
rl.prompt();

// слушатель line
rl.on('line', function (answer) {
    if (answer.trim() === 'exit') rl.close() // выхожу

    fs.appendFile(pathToFile, answer + '\n', (err) => {
        if (err) {
            console.error(err)

        }

    })
    // fs.appendFile(pathToFile, '\n', (err) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //
    // })
    rl.prompt(); // продолжаю процесс ввода
})

rl.on('close', function () {
    console.log(messageExit); // вывожу сообщение
    process.exit(0); // завершаю работу скрипта
});


rl.on('SIGINT', () => {
    console.log(messageExit);
    process.exit(0);
})

//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//    prompt: 'введите текст для сохранения в файл',  //сообщение в кансоле
// });
//
// rl.prompt()
// rl.on('SIGINT', () => rl.pause)
/* rl.on('SIGINT', () => {
    rl.question(
        'Are you sure you want to exit? ',
        (answer) => {
            if (answer.match(/^y(es)?$/i)) rl.pause();
        }
    );
});
 закрытие через ctrl+c с вопросом */

//
// rl.on('line', (line) => {
//     switch (line.trim()) {
//         case 'hello':
//             console.log('world!');
//             break;
//         default:
//             console.log()
//                 `Say what? I might have heard '${line.trim()}'`
//             );
//             break;
//     }
//     rl.prompt();
// }).on('close', () => {
//     console.log('Have a great day!');
//     process.exit(0);
// });

// const rl = readline.createInterface({
//     input: fs.createReadStream(pathToNewFile),
//     crlfDelay: Infinity,
// });
//
// rl.on('line', (line) => {
//     console.log(`Line from file: ${line}`);
// });

