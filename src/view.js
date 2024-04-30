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
            elements.form.reset()
            elements.input.focus()
        default:
            break;
    }
}
 
export const watchState = (state, elements) => {
    return onChange(state, (path, value) => {
        switch (path) {
            case "form.status": {
                handleChangeForm(value, elements);
                break;
            } 
        }
    })
}