import { whitelistDapp_backend ,canisterId, createActor} from "../../declarations/whitelistDapp_backend";
import {AuthClient} from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";



let authenticatedCanister = whitelistDapp_backend;

let myPrincipal;

let authClient;

let identity;


async function userLogin(){

  authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handleAuthenticated();
  } else {
    await authClient.login({
      identityProvider: process.env.II_URL,
      onSuccess: () => {
        handleAuthenticated();
      },
    });
  }
};

async function handleAuthenticated() {
  identity = await authClient.getIdentity();
  myPrincipal = await identity._principal.toString();

  // console.log("canister Id:",canisterId)
  // console.log("myPrincipal : ",myPrincipal);
  //  console.log("AuthClient : ",authClient);

  authenticatedCanister  = createActor(canisterId, {
       agentOptions:{
            identity,
         },
       
     });


  document.getElementById("greeting").innerText = `Your Local Internet Identity Principal is :${myPrincipal}`;

  
}


//prompt login when page is loaded
window.addEventListener('load', async ()=>{
  await userLogin()
})







// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await whitelistDapp_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });
