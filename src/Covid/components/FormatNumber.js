function FormatNumber(num) {
    if (num && num.prop > 999) {
        return num.prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    else if (num && num.prop) {
        return num.prop
    }
    else { return null }
}

export default FormatNumber
