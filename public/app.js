// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
     apiKey: "AIzaSyClYBau_KYGEiitdBo1KSJCDfy-8BZda0E",
     authDomain: "share-my-activity.firebaseapp.com",
     databaseURL: "https://share-my-activity.firebaseio.com",
     projectId: "share-my-activity",
     storageBucket: "share-my-activity.appspot.com",
     messagingSenderId: "966863510348",
     appId: "1:966863510348:web:41b43bd09ccd244c058de9",
     measurementId: "G-YJJK1ZL449",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Auth stuff
const auth = firebase.auth();

//Reference from DOM
//password
const txtWebsitePass = document.getElementById("txtWebsitePassword");
const txtPass = document.getElementById("txtPassword");
//buttons
const btnWebsiteVerify = document.getElementById("btnWebsiteVerify");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const provider = new firebase.auth.GoogleAuthProvider(); 

//btnLogin.onclick = () => auth.signInWithPopup(provider);  
btnLogout.onclick = () => auth.signOut();

//Getting the radio buttons
let radios = document.getElementsByName('activityType');

//Getting the radio buttons
let loBoxes = document.getElementsByName('loType');

//database stuff
let postCollection = document.querySelector(".gridObject");
const db = firebase.firestore();

//parse post
function createPost(date, type, title, author, content) {
  let div = document.createElement("div");
  
  //div components
  let time = document.createElement("time");
  let span = document.createElement("span");
  let h3 = document.createElement("h3");
  let h5 = document.createElement("h5");
  let hr = document.createElement("hr");
  let pre = document.createElement("pre");
  let like = document.createElement("button");

  time.textContent = date;
  span.textContent = type;
  h3.textContent = title;
  h5.textContent = author;
  pre.textContent = content;

  // REGEX : http://talkerscode.com/webtricks/convert-url-text-into-clickable-html-links-using-javascript.php

	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	var text = pre.textContent.replace(exp, "<a target='_blank' href='$1'>URLリンク↗</a>");
	var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  pre.innerHTML = text.replace(exp2, "$1<a target='_blank' href='http://$2'>URLリンク↗</a>");

  if (span.textContent === "CAS") {
    span.setAttribute("class", "casMiniTag")
    div.setAttribute("class", "casTag")
  }else{
    span.setAttribute("class", "saaMiniTag")
    div.setAttribute("class", "saaTag")
  }
  like.setAttribute("class", "likeBtn");

  div.appendChild(time);
  div.appendChild(span);
  div.appendChild(h3);
  div.appendChild(h5);
  div.appendChild(hr);
  div.appendChild(pre);
  div.appendChild(like);

  like.innerHTML="いいね 👍";

  like.onclick = function(){
    div.setAttribute("style", "animation: likeAni 0.7s linear;")
    like.setAttribute("class", "likeBtn");
    like.innerHTML="いいねしました ❤️"

    // db.collection('posts').doc().update({
    //   postLike: firebase.firestore.FieldValue.increment(1)
    // });
  };

  postCollection.appendChild(div);
}


//GET STUFF
const limitValue = 20;
const allBtn = document.querySelector('#allPosts');
const casBtn = document.querySelector('#casFilter');
const saaBtn = document.querySelector('#saaFilter');
// get cas data
casBtn.addEventListener('click', function getCAS() {
  allBtn.style.display = "block";
  casBtn.style.display = "none";
  saaBtn.style.display = "block";

  const saaPosts = postCollection.querySelectorAll(".saaTag");
  const casPosts = postCollection.querySelectorAll(".casTag");
  for (let i = 0; i < saaPosts.length; i++) {
    saaPosts[i].style.display = "none";
  }
  for (let i = 0; i < casPosts.length; i++) {
    casPosts[i].style.display = "block";
  }
  console.log("Erased S&A")
})
// get s&a data
saaBtn.addEventListener('click', function getSAA() {
  allBtn.style.display = "block";
  saaBtn.style.display = "none";
  casBtn.style.display = "block";

  const saaPosts = postCollection.querySelectorAll(".saaTag");
  const casPosts = postCollection.querySelectorAll(".casTag");
  for (let i = 0; i < casPosts.length; i++) {
    casPosts[i].style.display = "none";
  }
  for (let i = 0; i < saaPosts.length; i++) {
    saaPosts[i].style.display = "block";
  }
  console.log("Erased CAS")
})


if (allBtn.style.display === "none") {
  //get posts
  function getPosts() {
  db.collection("posts")
    .limit(limitValue)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot=>{
      snapshot.docs.forEach(docs=>{
        createPost(
          docs.data().createdAt,
          docs.data().postType,
          docs.data().postName,
          docs.data().postAuthor,
          docs.data().postContent,
          docs.data().postLike
          );
      });
    }).catch(err => {
      console.log(err);
    });
  }
  getPosts();  
}

const loader = document.querySelector(".loadObject");
const loadAni = document.querySelector(".loadingAni");

// check pass
btnLogin.onclick = () => {
  if (txtPass.value === "kngSMA2021") {
    auth.signInWithPopup(provider);
  }else{
    alert("⚠ ログインできません");
  }
}

//Google Auth
auth.onAuthStateChanged(user => {
if (user) {
  loader.remove();

  //signed in
  whenSignedIn.hidden=false;
  whenSignedOut.hidden=true;
  addFeature.hidden=false;
  postButtons.hidden=false;

  loginPopUp.innerHTML=`<button class="closeLoginPopUp" onclick="popUpFunction()">✕ 閉じる</button>ログイン済みです！<br><h3>${user.displayName}さん、SMAダッシュボードへようこそ 🎉</h3>`;

  //CREATE THE POST
  document.querySelector('#publishPost').addEventListener('click',function () {
    let postDate  = document.querySelector('#postDate').value;
    let postTitle  = document.querySelector('#postTitle').value;
    let postAuthor  = document.querySelector('#postAuthor').value;
    let postContent = document.querySelector('#postContent').value;

    function radioValueFunction() {
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
              return radios[i].value;
        }
      }      
    }

    if (postDate === "" ||
        postTitle === "" ||
        postAuthor === "" ||
        postContent === "") {
          alert("全ての欄を記入してください");
        }else{
          db.collection('posts').doc().set({
              createdAt:postDate,
              postName:postTitle,
              postAuthor:postAuthor,
              postContent:postContent,
              postType:radioValueFunction(),
              postLike:0
          })
        }
    document.getElementById("createPost").hidden=true;
  })

    //Date And Message
    var d = new Date();
    var h = d.getHours();
    if (h > 12) {
      userDetails.innerHTML = `<img src="${user.photoURL}"><h3>${user.displayName}さん<br>こんばんは 🌃<h3><small>${user.email}</small>`;
    }else{
      userDetails.innerHTML = `<img src="${user.photoURL}"><h3>${user.displayName}さん<br>こんにちは 🌄<h3><small>${user.email}</small>`;
    }
    
    loadAni.remove();

  }else{
    //signed out
    whenSignedIn.hidden=true;
    whenSignedOut.hidden=false;

    addFeature.hidden=true;

    // loginPopUp.innerHTML=`ログイン成功！`;
    postButtons.hidden=true;
    userDetails.innerHTML=``;

    loadAni.remove();


    // check　website pass
    btnWebsiteVerify.onclick = () => {
      if (txtWebsitePass.value === "kngSMA") {
        loader.remove();
      }else{
        alert("⚠ パスワードが間違っています");
      }
    }
  }
})

