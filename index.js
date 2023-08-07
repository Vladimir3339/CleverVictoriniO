let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

//настройка facker
let { faker } = require(`@faker-js/faker`);

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/CleverVictoriniO');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // обязательно
        unique: true //уникальность
    },
    password: {
        type: String,
        required: true, // обязательно
    },
    image:String,
    allTrue: Number,
    maxSeries: Number,
    nowSeries: Number,
    TrueAnswer: [mongoose.ObjectId]
}, {
    timestamps: true
});

let User = mongoose.model('user', userSchema);

let questionSchema = new mongoose.Schema({
    question: String,
    group: String,
    level: Number,
    trueValue: Number,
    answer: [String]
});

let Question = mongoose.model('question', questionSchema);
let groupSchema = new mongoose.Schema({
    title: String,
    value: String
});

let Group = mongoose.model('group', groupSchema);
let levelSchema = new mongoose.Schema({
    title: String,
    value: Number
});

let Level = mongoose.model('level', levelSchema);

app.get(`/rating/all`, async function (req, res) {
    let users = await User.find().sort({ maxSeries: -1, allTrue: -1 }).limit(10);
    res.send(users);
});
app.get(`/play/groups/all`, async function (req, res) {
    let groups = await Group.find({});
    res.send(groups);
});
app.get(`/play/levels/all`, async function (req, res) {
    let levels = await Level.find({});
    res.send(levels);
});

app.post(`/register/add`, async function (req, res) {
    let { username, password } = req.body;
    let user = new User({
        username: username,
        password: password,
        allTrue: 0,
        maxSeries: 0,
        nowSeries: 0,
        TrueAnswer:[],
        image:faker.image.avatar()
    });
    try {   // План А (идеальный)
        await user.save();
        res.send(user)
    } catch (err) { res.send('err3') }
});

app.post(`/login/find`, async function (req, res) {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username, password: password });
    try {   // План А (идеальный)
        await user.save();
        res.send(user)
    } catch (err) { res.send('err1') }
});

app.post(`/profile/edit`, async function (req, res) {
    let { username, password, image, _id } = req.body;
    let user = await User.findOne({ _id: _id });
    user.username = username;
    user.password = password;
    user.image = image;
    try {   // План А (идеальный)
        await user.save();
        res.send(user);
    } catch (err) { res.send('err1') }
});

app.post(`/play/question`, async function (req, res) {
    let { _id, group, level } = req.body;
    let questions;
    let freeQuestions;
    if (group && level > 0)
    {questions = await Question.find({ group: group, level: level });}
    else   if (group )
    {questions = await Question.find({ group: group});}
    else if (level > 0)
    {questions = await Question.find({level: level });}
    else 
    {questions = await Question.find({});}
    if (_id) {
        let user = await User.findOne({ _id: _id });
        if (user.TrueAnswer) {
            freeQuestions = questions.filter(a => !user.TrueAnswer.includes(a._id));
        } else {
            freeQuestions = questions
        }
    } else {
        freeQuestions = questions
    }
    if (freeQuestions.length == 0){
        freeQuestions = questions
    }
    let questionIndex = Math.floor(Math.random() * freeQuestions.length);
    let question = freeQuestions[questionIndex];
    try {   // План А (идеальный)
        res.send(question)
    } catch (err) { res.send('err1') }
});

app.post(`/play/result`, async function (req, res) {
    let { _id, result, idQuestion } = req.body;
    let thisSeries;
    let isRecord;
    let user = await User.findOne({ _id: _id })
    if (result == true) {
        user.nowSeries++;
        user.allTrue++;
        if (user.TrueAnswer.indexOf(idQuestion) == -1){
            user.TrueAnswer.push(idQuestion);
        }
    } else if (result == false) {
        thisSeries = user.nowSeries;
        if (user.nowSeries > user.maxSeries){user.maxSeries = user.nowSeries;
        isRecord = true};
        user.nowSeries = 0;
        
    }
    try {   // План А (идеальный)
        user.save();
        res.send({user:user,thisSeries:thisSeries, isRecord:isRecord})
    } catch (err) { res.send('err1') }
});

async function newUsers() {
    for (i = 0; i < 7; i++) {
        let user = new User({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            allTrue: faker.string.numeric(3),
            maxSeries: faker.string.numeric(2),
            nowSeries: faker.string.numeric(1),
            TrueAnswer : ['64972ca218dfa5942cd901a5'],
            image:faker.image.avatar()
        });

        try {   // План А (идеальный)
            await user.save();
        } catch (err) { console.log('3')}
    }
};


//Для заполнения базы данных
async function newGroups() {
    let group = new Group({
        title: 'Английский язык',
        value: 'engl'
    });
    try {   // План А (идеальный)
        await group.save();
    } catch (err) { }
};

async function newLevel() {
    let level = new Level({
        title: 'Сложно',
        value: 3
    });
    try {   // План А (идеальный)
        await level.save();
    } catch (err) { }
};
//заполнение вопросов trueValue - номер правильного ответа в массиве ответов (начиная с нуля)
async function newQuestions() {
    let question = new Question({
        question: 'Draft',
        group: 'engl',
        level: 3,
        answer: ['дрифт', 'зубрить', 'черновик', 'задумываться'],
        trueValue: 2

    });
    try {   // План А (идеальный)
        await question.save();
    } catch (err) { }
};

//newQuestions()
//newLevel();
//newGroups();
//newUsers();