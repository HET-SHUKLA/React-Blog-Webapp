import './App.css'
import conf from './conf/conf';
import auth from './appwrite/auth';

function App() {
  // const obj = {email: "shuklahet2704@gmail.com", password: "1234567", name: "Het"};
  // const promise = auth.createAccountWithEmail(obj);
  // promise.then(
  //   console.log(auth.getCurrentUser())
  // )
  
  return (
    <>
      <h1>Blog Application : {conf.appwriteBucketId}</h1>
    </>
  )
}

export default App
