import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, onSnapshot, doc, query, where, orderBy, getDoc
} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,  } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD_R5vFFEfanu44QPHWXpoqj4tERgeWQBE",
  authDomain: "davefirst-8be78.firebaseapp.com",
  projectId: "davefirst-8be78",
  storageBucket: "davefirst-8be78.appspot.com",
  messagingSenderId: "676139394636",
  appId: "1:676139394636:web:b076c33e072b6f62fdb6e9",
  measurementId: "G-KRTDRST6Q1"
};

// from the html page
const list = document.querySelector('.list')

// initializing the web app
initializeApp(firebaseConfig)

// for the firestore database of my console
const db = getFirestore()
const auth = getAuth()

// // for the reference to the specific collection of the database
const colref = collection(db, 'player')

// for also referencing a particular collection of the database but adding some criterias on how the documents of this collection would be return... like saying it should return with some condition...querying the collection 
const q = query(colref, where('name', '==', 'messi'), orderBy('name', 'asc'))


const containerForm = document.querySelector('.container-form')
const containerLandinpage = document.querySelector('.container-landingPage')
const containerLogin = document.querySelector('.container-login')



const signUp = document.querySelector('.sign-up')
signUp.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signUp.email.value
  const password = signUp.password.value
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred)
    signUp.reset()
    if(cred){
      allowAccess(cred)
    }else{
      allowAccess(cred)
    }
  }).catch(err => {
    console.log(err.message)
  })
})

console.log('hello there')

const login = document.querySelector('.login')
login.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = login.email.value;
  const password = login.password.value

  // const error = document.querySelector('.error')
  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred)
    if(cred){
      allowAccess(cred)
    }else{
      allowAccess(cred)
    }
  }).catch((err) => {
    console.log(err.message)
    login.reset()
  }) 
})

onAuthStateChanged(auth, (user) => {
  console.log(user)
  if(user){
    allowAccess(user)
  }else{
    allowAccess()
  }


})

const logout = document.querySelector('.logout')
logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log(`this is user has signed out`)
  }).catch(err => {
    console.log(err.message)
  })
})


const tologin = document.querySelector('.to-login')
tologin.addEventListener('click',(e) => {
  e.preventDefault()
  containerLogin.classList.remove('display')
  containerForm.classList.add('display')
   
})
const tosignUp = document.querySelector('.to-signUp')
tosignUp.addEventListener('click',(e) => {
  e.preventDefault()
  containerForm.classList.remove('display')
  containerLandinpage.classList.add('display')
  containerLogin.classList.add('display')
   
})


function allowAccess(user){
    if(user){
    containerLandinpage.classList.remove('display')
    containerLogin.classList.add('display')
    containerForm.classList.add('display')
  }else{
    containerLandinpage.classList.add('display')
    containerLogin.classList.remove('display')
  }
}
































































// //adding a document to a collection('player') with data [name, age]
// const inputNavform = document.querySelector('.input-navform')
// inputNavform.addEventListener('submit', (e) => {
//   e.preventDefault()

//   // getting the values of the forms input fields
//   const player = inputNavform.player.value;
//   const age = inputNavform.age.value;

//   createUserWithEmailAndPassword(auth, player, age).then(cred => {
//     console.log(cred)
//     console.log('the cred user is ', cred.user)
//     console.log('the cred user provider id ', cred.providerId)
//     console.log('the cred user display name ', cred.user.displayName) 
//     console.log('the cred user email is ', cred.user.email) 
//     console.log('the cred user email verified is ', cred.user.emailVerified) 
//     console.log('the cred user getIdToken ', cred.user.getIdToken) 
//     console.log('the cred user getIdToken result ', cred.user.getIdTokenResult) 
//     console.log('the cred user is Anonymouns ', cred.user.isAnonymous) 
//     console.log('the cred user metadat is ', cred.user.metadata) 
//     console.log('the cred user phoneNumber is ', cred.user.phoneNumber) 
//     console.log('the cred user unique id is ', cred.user.uid) 
//     console.log('the cred user photourl is ', cred.user.photoURL) 
    
//   }).catch(err => {
//     console.log(err.message)
//   })

//   // adding the documents with data[name, age] to collection ('player')
//   addDoc(colref, {
//     name : player,
//     age : age
//   }).then(() => {
//     inputNavform.reset()
//     console.log(`
//     player ${player} of age ${age} has been added to the database 
//     `)
//   })

// })

// //just getting all the documents to show in the console and using a function to add the data from the document to the list in the html page...it gets it but doesn't applied data it has gotten to the page immediately....let say it is not a active listener..you have to reload the page for the data it has gotten from the collection database to be applied to the html page
// // getDocs(colref).then(snapshots => {
// //   console.log(snapshots.docs)

// //   snapshots.docs.forEach(doc => {
// //     addlist(doc)
// //     console.log(doc.data())
// //   })
 
// // })

// onSnapshot(colref, (snapshots) => {

//   addlist(snapshots.docs)

// })


// function addlist(data){
//   let html = ''
//   data.forEach(doc => {
//     const doci = doc.data()
//     let li = `
//     <li class="list-item">
//     <div id="name">${doci.name}</div>
//     <div>${doci.age}</div>
//     </li>
//     `
//     html += li
//   })
//   list.innerHTML = html
// }


// const updateDoci = document.getElementById('update-doci')
// updateDoci.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const docref = doc(db, 'player', updateDoci['update-doc'].value)

//   getDoc(docref).then(data => {
//     console.log(data.data(), ' is here') 
//   })

//   updateDoc(docref, {
//     age : 21
//   }).then(() => {
//     updateDoci.reset()
//     console.log(g)
// }).catch(err => {
//     console.log(err.message)
//   })

// })