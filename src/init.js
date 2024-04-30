// @ts-check
import * as yup from "yup"
// import Example from './Example.js';
import { watchState } from "./view.js";


const validateForm = (newUrl, prevUrls) => {
  return yup
    .string()
    .url()
    .notOneOf(prevUrls)
    .required()
    .validate(newUrl)
}

export default () => { 
  const formElement = document.querySelector(".rss-form");
  const inputElement = document.querySelector("#url-input");

  const elements = {
    form: formElement,
    input: inputElement,
  } 

  const initState = {
    form: {
      status: "initial",
      errorMessage: ""
    },
    allUrls: []
  }

  const state = watchState(initState, elements); 
 
  elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const FD = new FormData(e.target);
    const urlFromForm = FD.get("url");
      
    validateForm(urlFromForm, state.allUrls)
      .then(link => {
        state.form.status = 'success';
        state.allUrls.push(link)
      })
      .catch(err => {
        state.form.status = "error";
        state.form.errorMessage = err.message;
      })
  })
};
