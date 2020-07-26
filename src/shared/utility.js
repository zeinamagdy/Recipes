export const updatedObject = (oldObj, updatedProps) => {
    return {
        ...oldObj,
        ...updatedProps
    }
}



export const checkValidaity = (value, rules) => {
    if (!rules)
        return true;
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxlength) {
        isValid = value.trim().length <= rules.maxlength && isValid;
    }
    return isValid;
}