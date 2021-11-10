// Learning outcomes list data
var learningOutcomesList = new Vue({
    el: '#learning-outcomes-list',
    data: {
        engOutcomes: [
            { text: 'Identify your own strengths and develop areas for personal growth.' },
            { text: 'Demonstrate challenges have been undertaken, developing new skills in the process.' },
            { text: 'Demonstrate how to initate and plan a CAS experience.' },
            { text: 'Show commitment to and perseverance in CAS experience.' },
            { text: 'Demonstrate the skills and recognize the benfits of working collaboratively.' },
            { text: 'Demonstrate engagement with issues of global significance.' },
            { text: 'Recognize and consider the ethics of choices and actions.' },
        ],
        jpnOutcomes: [
            { text: '自らの長所と成長すべき点を認識する。' },
            { text: '課題に挑戦し、その過程で新しいスキルを習得している。' },
            { text: '自らCASを計画し開始することができる。' },
            { text: 'CAS活動を継続し、やり遂げる粘り強さを示す。' },
            { text: '自らのスキルを活かし、また他者と共に活動する意義を認識する。' },
            { text: 'グローバルな問題に取り組む。' },
            { text: '選択と行動の倫理を認識し、考察する。' },
      ]
    },
    methods: {
        langFunction: function () {
            const jpn = document.getElementById("loJPN");
            const eng = document.getElementById("loENG");
            
            if (eng.style.display === "none") {
                jpn.style.display="none";
                eng.style.display="block";
            } else {
                jpn.style.display="block";
                eng.style.display="none";
            }
        }
    }
})

// Sites related to school list data
var relatedSites = new Vue({
    el: '#related-sites',
    data: {
        relatedSites: [
            {
                name: '開智日本橋学園',
                href: 'http://kng.ed.jp',
            },
            {
                name: 'Mreader',
                href: 'https://mreader.org/index.php',
            },
            {
                name: 'LearnGeoWithMe',
                href: 'https://www.learngeowith.me/',
            },
        ]
    }
})

// Sites by students list data
var studentSites = new Vue({
    el: '#student-sites',
    data: {
        studentSites: [
            {
                name: 'KNG Can Food Drive',
                href: 'http://www.kngcan.info/',
            },
            {
                name: 'Orenohibi',
                href: '',
            }
        ],
    }
})

// SMA pages list data
var smaSites = new Vue({
    el: '#sma-sites',
    data: {
        smaSites: [
            {
                name: 'KNG Can Food Drive',
                href: 'http://www.kngcan.info/',
            },
            {
                name: 'Orenohibi',
                href: '',
            }
        ],
    }
})

//Version alert pop up
//ERASING THE POP UP ON CLICK
function eraseVersionNotify(){
    document.getElementById("versionNotify").style.display="none";
}

//Darkmode variablenames
const LD = document.getElementById('LtoD');
const DL = document.getElementById('DtoL');

//Darkmode toggle
function LtoD() {
    document.documentElement.classList.toggle('darkMode', false);
    // img.toggle('darkMode', false);
    LD.style.display="block";
    DL.style.display="none";
}
function DtoL() {
    document.documentElement.classList.toggle('darkMode', true);
    // img.toggle('darkMode', false);
    LD.style.display="none";
    DL.style.display="block";
}
//Darkmode time
var h = new Date().getHours();
if (h > 19) {
    DtoL();
}else{
    LtoD();
}

//erasing stuff
function loginPopUpFunction(){
    const loginPopUp = document.getElementById("loginPopUp");
    if (loginPopUp.style.display === "none") {
        loginPopUp.style.display = "block";
    } else {
        loginPopUp.style.display = "none";
    }
}

function announcePopUpFunction(){
    const announcePopUp = document.getElementById("announcePopUp");
    if (announcePopUp.hidden === true) {
        announcePopUp.hidden = false;
    } else {
        announcePopUp.hidden = true;
    }
}

function blockDisplay(value) {
    const createPost = document.getElementById("createPost");
    if (value === 1) {
        createPost.hidden=false;
    }else{
        createPost.hidden=true;
    }
}

function confirmPrompt() {
    document.getElementById("confirmDiv").style.display="block";
    document.getElementById("firstSubmit").style.display="none";
}

