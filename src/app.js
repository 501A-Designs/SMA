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
let postCollection = document.querySelector("#postCollection");
let announcePostCollection = document.querySelector("#announcePosts");

const db = firebase.firestore();

//parse post
function createPost(doc) {
  let div = document.createElement("div");
  let section = document.createElement("section");
  
  //div components
  let time = document.createElement("time");
  let span = document.createElement("span");
  let h3 = document.createElement("h3");
  let h5 = document.createElement("h5");
  let hr = document.createElement("hr");
  let pre = document.createElement("pre");
  let like = document.createElement("button");
  let view = document.createElement("button");

  time.textContent = doc.data().createdAt;
  span.textContent = doc.data().postType;
  h3.textContent = doc.data().postName;
  h5.textContent = doc.data().postAuthor;
  pre.textContent = doc.data().postContent;
  like.innerHTML = "<span class='material-icons' style='font-size:16px'>thumb_up</span> " + doc.data().postLike;
  view.innerHTML = "<span class='material-icons'>sticky_note_2</span>";

  // REGEX : http://talkerscode.com/webtricks/convert-url-text-into-clickable-html-links-using-javascript.php

	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	var text = pre.textContent.replace(exp, "<a target='_blank' href='$1'>URLリンク↗</a>");
	var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  pre.innerHTML = text.replace(exp2, "$1<a target='_blank' href='http://$2'>URLリンク↗</a>");

  if (span.textContent === "CAS") {
    span.setAttribute("class", "casMiniTag")
    div.setAttribute("class", "post")
  }else{
    span.setAttribute("class", "saaMiniTag")
    div.setAttribute("class", "post")
  }

  like.setAttribute("class", "likeBtn");
  view.setAttribute("class", "viewPostBtn");

  div.appendChild(time);
  div.appendChild(span);
  div.appendChild(view);
  div.appendChild(h3);
  div.appendChild(h5);
  div.appendChild(hr);
  div.appendChild(pre);
  div.appendChild(like);

  view.onclick = () => {
    var newWindow = window.open("", "MsgWindow", "width=400,height=200");
    newWindow.document.write(doc.data().postContent);
  };

  like.onclick = () => {
    const likeIncrement = firebase.firestore.FieldValue.increment(1);
    db.collection('posts')
      .doc(doc.id)
      .update({ postLike: likeIncrement })
      .catch(function (error) {
          console.log("Error getting documents: ", error);
      });
    
    div.setAttribute("style", "animation: likeAni 0.7s linear;")
    like.innerHTML = "<span class='material-icons' style='font-size:16px'>thumb_up</span><span class='material-icons' style='font-size:16px'>done</span>";
    like.setAttribute("disabled", "");
  };

// make so that everytime post publish btn is clicked adds +1 to users document. Display added value to frontend
  // dataRef.doc(user.uid).get().then((doc) => {
  //         getSubjects(doc)
  //         // console.log(doc.data().cells)
  //     }).catch((error) => {
  //         console.log("Error getting document:", error);
  //     });


  postCollection.appendChild(div);
}
// parse announce
function createAnnouncePost(aDoc) {
  let div = document.createElement("div");
  let time = document.createElement("time");
  let h3 = document.createElement("h3");
  let span = document.createElement("span");
  let hr = document.createElement("hr");
  let pre = document.createElement("pre");

  time.textContent = "〜" + aDoc.data().aPostEnd + "まで";
  h3.textContent = aDoc.data().aPostTitle;
  span.textContent = "投稿日：" + aDoc.data().aPostStart;
  pre.textContent = aDoc.data().aPostContent;

	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	var text = pre.textContent.replace(exp, "<a target='_blank' href='$1'>$1</a>");
	var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  pre.innerHTML = text.replace(exp2, "$1<a target='_blank' href='http://$2'>$2</a>");

  div.appendChild(time);
  div.appendChild(h3);
  div.appendChild(span);
  div.appendChild(hr);
  div.appendChild(pre);

  announcePostCollection.appendChild(div);
}


// PAGINATE DATA
const limitValue = 7;
const loadMore = document.querySelector('#loadMore');


//GET STUFF
// const casBtn = document.querySelector('#casFilter');
// const saaBtn = document.querySelector('#saaFilter');
// const saaPosts = postCollection.querySelectorAll(".saaMiniTag");
// const casPosts = postCollection.querySelectorAll(".casMiniTag");
// // get cas data
// casBtn.addEventListener('click', function getCAS() {
//   for (let i = 0; i < saaPosts.length; i++) {
//     saaPosts[i].style.display = "none";
//   }
//   for (let i = 0; i < casPosts.length; i++) {
//     casPosts[i].style.display = "block";
//   }
//   console.log("Erased S&A")
// })
// // get s&a data
// saaBtn.addEventListener('click', function getSAA() {
//   for (let i = 0; i < casPosts.length; i++) {
//     casPosts[i].style.display = "none";
//   }
//   for (let i = 0; i < saaPosts.length; i++) {
//     saaPosts[i].style.display = "block";
//   }
//   console.log("Erased CAS")
// })

// let latestDoc = null;
const getPosts = async () => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      // .startAfter(latestDoc || 0)
      .limit(limitValue)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          createPost(doc);
        });
      }).catch(err => {
        console.log(err);
      });
    }
const getAnnouncePosts = async () => {
  db.collection("announce")
  .limit(limitValue)
  .orderBy("aPostEnd", "desc")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(aDoc => {
      createAnnouncePost(aDoc);
    });
  }).catch(aErr => {
    console.log(aErr);
  });
}
  
window.addEventListener('DOMContentLoaded', function () {
  getPosts();
  getAnnouncePosts();
})

// function nextBatch(last) {
//   return ref.orderBy("createdAt", "desc")
//             .startAfter(last["createdAt", "desc"])
//             .limit(limitValue);
// }

loadMore.addEventListener('click', function () {
  getPosts();
})

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
  postButtons.hidden = false;
  announcePostButton.hidden = false;
  addSite.hidden = false;

  loginPopUp.innerHTML = `<button class="close" onclick="loginPopUpFunction()"></button>ログイン済みです！<br><h3>${user.displayName}さん、SMAダッシュボードへようこそ 🎉</h3>`;

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
              postType: radioValueFunction(),
              postLike:0
          })
    }
    document.getElementById("createPost").hidden=true;
  })

  // Create Announce
  document.querySelector('#publishAnnounce').addEventListener('click',function () {
    let announceTitle  = document.querySelector('#announceTitle').value;
    let announceStartDate  = document.querySelector('#announceStartDate').value;
    let announceEndDate  = document.querySelector('#announceEndDate').value;
    let announceContent = document.querySelector('#announceContent').value;

    if (announceTitle === "" ||
        announceStartDate === "" ||
        announceEndDate === "" ||
        announceContent === "") {
          alert("全ての欄を記入してください");
        }else{
          db.collection('announce').doc().set({
              aPostTitle:announceTitle,
              aPostStart:announceStartDate,
              aPostEnd:announceEndDate,
              aPostContent:announceContent
          })
    }
    document.getElementById("announcePopUp").hidden=true;
  })
  const firstName = user.displayName.split(" ")[0];
  const userPostSum = 0;

    //Date And Message
    var d = new Date();
    var h = d.getHours();
    if (h > 12) {
      userDetails.innerHTML = `<img src="${user.photoURL}"><h3>${firstName}さん<br>こんばんは 🌃</h3><h4>総投稿数：${userPostSum}</h4>`;
    }else{
      userDetails.innerHTML = `<img src="${user.photoURL}"><h3>${firstName}さん<br>こんにちは 🌄</h3><h4>総投稿数：${userPostSum}</h4>`;
    }
    loadAni.remove();

  }else{
    //signed out
    whenSignedIn.hidden=true;
    whenSignedOut.hidden=false;
    addFeature.hidden = true;
    addSite.hidden = true;
    
    // loginPopUp.innerHTML=`ログイン成功！`;
    postButtons.hidden=true;
    announcePostButton.hidden=true;
    userDetails.innerHTML = ``;

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

