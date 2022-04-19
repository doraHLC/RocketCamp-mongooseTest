const http = require('http');
const Post = require('./models/movie');
const mongoose = require('mongoose');

//連接資料庫
mongoose.connect("mongodb://localhost:27017/movieReview")
    .then(() => {
        console.log('資料庫連接成功')
    })
    .catch((error) => {
        console.log(error)
    });

//資料
// Post.create(
//     {
//         movie: '魔比斯',
//         name: 'Jared Leto',
//         content: '在漫威宇宙中最具爭議性且複雜的角色即將在大銀幕與全球觀眾見面！由奧斯卡得主傑瑞德雷托領軍，飾演一位患有罕見疾病的生物化學博士麥可魔比斯；為治療自己的疾病，並試圖挽救其他遭受相同命運的人，他試圖進行一場絕望的豪賭，並大膽在實驗過程中利用吸血蝙蝠的DNA治療。雖說實驗結果在起初看似成功，但最後的結果只是顯示，這一切可能只是帶給他比原有疾病更糟糕的痛苦而已……。',
//         likes: 250
//     },
//     {
//         movie: '怪獸與鄧不利多的秘密',
//         name: 'Dumbledore',
//         content: '阿不思鄧不利多教授知道強大的黑巫師蓋勒葛林戴華德正準備控制整個魔法世界，但他深知自己無法單獨阻止葛林戴華德，於是委託奇獸飼育學家紐特斯卡曼德帶領一群勇敢的巫師、女巫和一位麻瓜烘焙師進行這項危險任務。他們在任務中將會遇到新舊奇獸，並與更多葛林戴華德的追隨者發生衝突，但隨著任務風險越來越高，鄧不利多還能置身事外到什麼時候呢？',
//         likes: 550
//     },
//     {
//         movie: '失落謎城',
//         name: 'Sandra Bullock',
//         content: '一位聰慧過人卻離群索居、個性孤僻的知名作家蘿莉塔賽吉（珊卓布拉克 飾）以創作故事發生在異國險境的暢銷愛情冒險小說為生，她筆下的男主人翁是根據一名高顏值的封面男模艾倫（查寧塔圖 飾）來塑造，他也一直以「戴許」這個角色自居。蘿莉坦與艾倫一起宣傳她的全新小說時，竟然被一名個性古怪的億萬富豪（丹尼爾雷徳克里夫 飾）綁架，他希望她能帶他找到她全新小說中那座失落謎城裡的大寶藏。艾倫為了想證明他不只是在小說中是個英雄，在現實生活中也一樣，就決定展開一場救援行動，企圖拯救蘿莉塔。於是這對歡喜冤家就踏上一場驚險刺激、趣味橫生的叢林大冒險，他們不但必須攜手合作，活著逃出處處危機的致命叢林，而且還得趁古老寶藏永遠遺失之前找到它。',
//         likes: 860
//     },
//     {
//         movie: '音速小子2',
//         name: 'Jim Carrey',
//         content: '音速小子索尼克在綠丘鎮安頓下來之後，他就急著要證明自己有能力成為一名真正的英雄。當蛋頭博士帶著全新的搭檔納克魯斯，又回來尋找一塊力量強大足以毀滅人類文明的翡翠的時候，他就面對了另一個嚴峻的考驗。這次索尼克和他自己的跟班塔爾斯攜手合作，一起踏上一場環遊世界的冒險旅程，希望能在那塊翡翠落入壞人手中之前先找到它。',
//         likes: 420
//     },
//     {
//         movie: '漂浪人生',
//         name: 'Jonas Poher Rasmussen',
//         content: '從喀布爾到哥本哈根，從幼年到成人，我穿越五千公里，願把人生交給你。《漂浪人生》為巧妙結合動畫與紀實手法拍攝而成的紀錄片，電影講述導演摯友的真實人生故事，一個身心漂浪多年的男人努力尋找家的真正定義。阿敏在與未婚夫結婚的前夕，娓娓道來20多年前的他，如何從阿富汗逃離到丹麥的不思議旅程，以及曾身為難民兒童令人心碎的悲慘記憶，而說出這個保守了20年的秘密，卻恐將危及他現在的人生⋯⋯。',
//         likes: 330
//     },
//     {
//         movie: '尋子風暴',
//         name: 'Claire Foy',
//         content: '在開車前往蘇格蘭高地的路上，愛德蒙（詹姆斯麥艾維 飾）接到前妻瓊安（克萊兒芙伊 飾）打來的電話，她哭著說他們七歲的兒子在露營場失蹤了。這對父母很快理解到這是一起綁架事件，並陷入絕望之中……。',
//         likes: 1000
//     }
// ).then(() => {
//     console.log('新增影評資料成功')
// })
//     .catch(error => {
//         console.log(error.errors)
//     })




const requestListener = async (req, res) => {
    let body = "";
    req.on('data', chunk => {
        body += chunk;
    })
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    if (req.url == '/posts' && req.method == 'GET') {
        const posts = await Post.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            posts
        }))
        res.end()
    } else if (req.url = '/posts' && req.method == 'POST') {
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newPost = await Post.create(
                    {
                        movie: data.movie,
                        name: data.name,
                        content: data.content,
                        likes: data.likes
                    }
                )
                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    "status": "success",
                    posts: newPost
                }))
                res.end()
            } catch (error) {
                res.writeHead(400, headers);
                res.write(JSON.stringify({
                    "status": "false",
                    "message": "欄位資訊有誤!",
                    "error": error
                }))
                res.end()
            }
        })
    } else if (req.url = '/posts' && req.method == 'DELETE') {
        const posts = await Post.deleteMany({})
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            posts: []
        }))
        res.end()
    } else if (req.method == "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}
const server = http.createServer(requestListener);
server.listen(3000);