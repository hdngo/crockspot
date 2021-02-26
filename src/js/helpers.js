const convertParamToName = (param) => {
    const exceptions = ['and', 'of']
    return param.split('-')
        .map(word => 
            exceptions.includes(word.toLowerCase()) ? word : (word.charAt(0).toUpperCase() + word.slice(1))
        ).join(' ')
}

const loDash = (string) => {
    return string.toLowerCase().split(' ').join('-')
}

module.exports = {
    convertParamToName,
    loDash
}