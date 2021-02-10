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
  // , urlName, url (Add parameter)
  //add "type" in function parameter (if the CAS / S&A tag system were to be implemented)

  //  lo,
  let div = document.createElement("div");
  //div components
  let time = document.createElement("time");
  let span = document.createElement("span");
  // let loSpan = document.createElement("span");
  let h3 = document.createElement("h3");
  let h5 = document.createElement("h5");
  let hr = document.createElement("hr");
  let pre = document.createElement("pre");
  // let casTag = document.getElementById("casLabel");
  // let linkName = document.createElement("small");
  // let link = document.createElement("h4");

  time.textContent = date;
  span.textContent = type;
  // loSpan.textContent = lo;
  h3.textContent = title;
  h5.textContent = author;
  pre.textContent = content;
  // linkName.textContent = urlName;
  // link.textContent = url;
  // link.innerHTML=`<a class="postLinkStyle" href="${link.textContent}">${linkName.textContent}</a>`;

  // REGEX : http://talkerscode.com/webtricks/convert-url-text-into-clickable-html-links-using-javascript.php

	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	  var text = pre.textContent.replace(exp, "<a target='_blank' href='$1'>URLリンク↗</a>");
	  var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	  pre.innerHTML=text.replace(exp2, "$1<a target='_blank' href='http://$2'>URLリンク↗</a>");
//  <iframe src="" height="600px" width=“800px" allowfullscreen>
//  </iframe>

// https://drive.google.com/open?id=

  if (span.textContent === "CAS") {
    span.setAttribute("class", "casMiniTag")
    div.setAttribute("class", "casTag")
  }else{
    span.setAttribute("class", "saaMiniTag")
    div.setAttribute("class", "saaTag")
  }

  div.appendChild(time);
  div.appendChild(span);
  // div.appendChild(loSpan);
  div.appendChild(h3);
  div.appendChild(h5);
  div.appendChild(hr);
  div.appendChild(pre);
  // div.appendChild(link);

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
// ge all data  
// allBtn.addEventListener('click', getPosts())

if (allBtn.style.display === "none") {
  //get posts
  function getPosts() {
  //before .get insert .orderBy("createdAt")
  db.collection("posts")
    .limit(limitValue)
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot=>{
      snapshot.docs.forEach(docs=>{
        createPost(
          docs.data().createdAt,
          docs.data().postType,
          // docs.data().loType,
          docs.data().postName,
          docs.data().postAuthor,
          docs.data().postContent
          // docs.data().postLinkName,
          // docs.data().postLink
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

  // loginPopUp.hidden=true;
  postButtons.hidden=false;
  // userDetails.innerHTML=`<h3>${user.displayName}さん<br>こんにちは 🌄<h3>`;

  loginPopUp.innerHTML=`<button class="closeLoginPopUp" onclick="popUpFunction()">✕ 閉じる</button>ログイン済みです！<br><h3>${user.displayName}さん、SMAダッシュボードへようこそ 🎉</h3>`;

  //CREATE THE POST BRUHHHHHHHH
  document.querySelector('#publishPost').addEventListener('click',function () {
    let postDate  = document.querySelector('#postDate').value;
    let postTitle  = document.querySelector('#postTitle').value;
    let postAuthor  = document.querySelector('#postAuthor').value;
    let postContent  = document.querySelector('#postContent').value;
    // let postURLName = document.querySelector('#postLinkName').value;
    // let postURL = document.querySelector('#postLink').value;

    function radioValueFunction() {
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
              return radios[i].value;
        }
      }      
    }
    // function loBoxesFunction() {
    //   for (let j = 0; j < loBoxes.length; j++) {
    //     if (loBoxes[j].checked) {
    //           return loBoxes[j].value;
    //     }
    //   }      
    // }    

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
              postType:radioValueFunction()
              // postLinkName:postURLName,
              // postLink:postURL
              // loType:loBoxesFunction()
          })
          // for (let i = 0; i < radios.length; i++) {
          //   if (radios[i].checked) {
          //     db.collection('posts').doc().set({
          //         createdAt:postDate,
          //         postName:postTitle,
          //         postAuthor:postAuthor,
          //         postContent:postContent,
          //         postType:radios[i].value,
          //         loType:loBoxes[i].value
          //     })
          //   }
          // }
          // BRUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
          // for (let j = 0; j < loBoxes.length; j++) {
          //   if (loBoxes[i].checked) {
          //     db.collection('posts').doc().set({
          //         loType:loBoxes[j].value
          //     })
          //   }
          // }
        }
    document.getElementById("createPost").hidden=true;
  })

  // document.getElementById("publishPost").addEventListener('click',function () {
    
// })

  //pull values from input
  // getPosts();



  //Date And Message
    var d = new Date();
    var h = d.getHours();
    if (h > 12) {
      // userDetails.innerHTML = `<h3>✔<br>ログイン済み<br><br>${user.displayName}さん<br>こんばんは 🌃<h3>`;
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

/* 
//Login Event
btnLogin.addEventListener("click", (e) => {
  //Getting email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  //Signing in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});
*/

// document.getElementById("postButtons").addEventListener("load",function () {
//   getPosts()  
// })
