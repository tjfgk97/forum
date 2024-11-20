const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')


const { MongoClient } = require('mongodb');

let db;
const url = 'mongodb+srv://tjfgk97:032200s!@forum.k7s3o.mongodb.net/?retryWrites=true&w=majority&appName=forum';
new MongoClient(url).connect().then((client) => {
    console.log('DB연결성공');
    db = client.db('forum');
}).catch((err) => {
    console.log(err);
})

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행 중')
})

app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})

app.get('/news', (요청, 응답) => {
    응답.send('오늘 비옴')
})

app.get('/list', async (요청, 응답)=>{
    let result = await db.collection('post').find().toArray()
    console.log(result[0].title);
    응답.render('list.ejs', { posts : result })
})

app.get('/time', (요청, 응답) => {
    응답.render('time.ejs', { time : new Date()})
})
