const convertParamToName = (param) => {
    const exceptions = ['and', 'of']
    return param.split('-')
        .map(word => 
            exceptions.includes(word.toLowerCase()) ? word : (word.charAt(0).toUpperCase() + word.slice(1))
        ).join(' ')
}

const loDash = (string) => {
    return string.toLowerCase().replace(/'/g, " ").split(' ').join('-')
}

const sortByPropsAsc = (data, prop, nestedProp) => {
    return nestedProp ? 
        data.sort((a, b) => {
            return a[prop][nestedProp] < b[prop][nestedProp] ? -1 : 1
        }) :
        data.sort((a, b) => {
            return a[prop] < b[prop] ? -1 : 1
    })
}

const sortByPropsDesc = (data, prop, nestedProp) => {
    return nestedProp ?
        data.sort((a, b) => {
            return a[prop][nestedProp] > b[prop][nestedProp] ? -1 : 1
        }) :
        data.sort((a, b) => {
            return a[prop] > b[prop] ? -1 : 1
        })
}

module.exports = {
    convertParamToName,
    loDash,
    sortByPropsAsc,
    sortByPropsDesc
}