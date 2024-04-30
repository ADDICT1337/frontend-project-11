// @ts-check
import * as yup from "yup"
// import Example from './Example.js';
import { watchState } from "./view.js";
import i18next from "i18next";
import ru from "./locales/ru.js";

const validateForm = (newUrl, prevUrls) => {
  return yup
    .string()
    .url("errors.invalidUrl")
    .notOneOf(prevUrls, "errors.alreadyExists")
    .required("errors.required")
    .validate(newUrl)
}

export default () => { 
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru
    }
  });
  
  const formElement = document.querySelector(".rss-form");
  const inputElement = document.querySelector("#url-input");
  const errorElement = document.querySelector(".feedback");
 

  const elements = {
    form: formElement,
    input: inputElement,
    error: errorElement,
  } 

  const initState = {
    form: {
      status: "initial",
      errorMessage: ""
    },
    allUrls: []
  }

  const state = watchState(initState, elements, i18nextInstance); 
 
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
