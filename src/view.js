import onChange from "on-change"; 

function handleChangeForm (value, elements) {
    const inputElement = elements.input;
    const formElement = elements.form;

    console.log(value, elements)
    // status
    switch (value) {
        case "error":
            inputElement.classList.add('is-invalid'); 
            break;
        case "success":
            formElement.reset()
            inputElement.focus()
        default:
            break;
    } 
}

function handleChangeErorr(errorMsg, element, i18nextInstance) {
    element.textContent = i18nextInstance.t(errorMsg)
}
 
export const watchState = (state, elements, i18nextInstance) => {
    return onChange(state, (path, value) => {
        switch (path) {
            case "form.status": {
                handleChangeForm(value, elements);
                break;
            } 

            case "form.errorMessage": {
                handleChangeErorr(value, elements.error, i18nextInstance)
            }
        }
    })
}