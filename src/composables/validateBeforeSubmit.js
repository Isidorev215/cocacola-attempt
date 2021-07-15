
const validateBeforeSubmit = (obj) => {
    const valueArray = Object.values(obj)
    const boolean = valueArray.every(value => {
        return value != null 
    })
    return boolean;
}
export default validateBeforeSubmit;