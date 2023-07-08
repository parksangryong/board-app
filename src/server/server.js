const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const db = require('./config/db.js')
//db.js 불러오기

app.use(express.json());
app.use(express.urlencoded({extended : false}));
//post 구현하기 위해 넣음

app.get('/id', (req,res) => {
    db.query(`select * from users`, (err,data) => {
        if(!err){
            res.send(data)
        }else{
            res.send(err)
        }
    })
})
//id 조회

app.post('/login', (req, res) => {
    const { id, password } = req.body;
  
    db.query(`SELECT * FROM users WHERE id = '${id}' AND password = '${password}'`, (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.json({ success: true, message: '로그인 성공' });
      } else {
        res.json({ success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
    });
  });
//로그인

app.post('/id', (req,res) => {
    console.log(req.body)
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password

    db.query(`insert into users values ('${id}', '${username}', '${password}')`, (err,data) => {
        if(!err){
            console.log("post 성공")
        }else{
            res.send(err)
        }
    })
}) // 회원가입

app.put('/id', (req,res)=>{
    console.log(req.body)
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password

    db.query(`update users set username= '${username}', password='${password}' where id='${id}'`, (err,data) => {
        if(!err){
            console.log("put 성공")
        }else{
            res.send(err)
        }
    })
}) // 회원정보 수정

app.delete('/id', (req,res)=>{
    console.log(req.body)
    const id = req.body.id

    db.query(`delete from users where id='${id}' `, (err,data) => {
        if(!err){
            console.log("delete 성공")
        }else{
            res.send(err)
        }
    })
}) // 회원탈퇴

app.get('/board', (req,res) => {
    db.query(`select * from boards order by id desc`, (err,data) => {
        if(!err){
            res.send(data)
        }else{
            console.log(err)
        }
    })
})
//게시판 전체 조회

app.get('/name/:name', (req,res) => {
    console.log(req.params)
    const name = req.params.name
    db.query(`select * from boards where user_id = '${name}' `, (err,data) => {
        if(!err){
            res.send(data)
        }else{
            console.log(err)
        }
    })
})
//자기 게시판 전체 조회

app.get('/num/:id', (req,res) => {
    console.log(req.params)
    const id = parseInt(req.params.id)
    db.query(`select * from boards where id = ${id} `, (err,data) => {
        if(!err){
            res.send(data)
        }else{
            console.log(err)
        }
    })
})
//게시판 상세보기

app.post('/board', (req,res) => {
    console.log(req.body)
    const id = parseInt(req.body.id)
    const title = req.body.title
    const content = req.body.content
    const user_id = req.body.user_id
    const w_date = req.body.w_date

    db.query(`insert into boards values (${id}, '${title}', '${content}', '${user_id}', '${w_date}')`, (err,data) => {
        if(!err){
            console.log("post 성공")
        }else{
            console.log(err)
        }
    })
}) // 게시물 등록

app.put('/board', (req,res)=>{
    console.log(req.body)
    const id = parseInt(req.body.id)
    const title = req.body.title
    const content = req.body.content

    db.query(`update boards set title= '${title}', content='${content}' where id=${id}`, (err,data) => {
        if(!err){
            console.log("put 성공")
        }else{
            console.log(err)
        }
    })
}) // 게시물 내용 수정

app.delete('/board', (req,res)=>{
    console.log(req.body)
    const id = parseInt(req.body.id)

    db.query(`delete from boards where id=${id}`, (err,data) => {
        if(!err){
            console.log("delete 성공")
        }else{
            console.log(err)
        }
    })
}) // 게시물 삭제

app.listen(PORT, () => {
    console.log(`Server On: http://localhost:${PORT}`)
})