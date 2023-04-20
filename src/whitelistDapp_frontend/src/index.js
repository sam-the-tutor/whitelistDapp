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

  authenticatedCanister  = createActor(canisterId, {
       agentOptions:{
            identity,
         },
       
     });


  document.getElementById("greeting").innerText = `Your Internet Identity Principal on the Mainnet is :${myPrincipal}`;

  
}


//prompt login when page is loaded
window.addEventListener('load', async ()=>{
  await userLogin()
})



