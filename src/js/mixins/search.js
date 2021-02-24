const { indexOf } = require("lodash")

const filterResults = (query, data)  => {
    let regex = new RegExp(`${query}`, 'i')
    return data.filter(item => 
        item.name.search(regex) >= 0
    )
}

const sortResults = () => {
    console.log(3, 4)
}

const recurse = (query, baseString) => {
    let regex = new RegExp(`${query}`, 'i')
    let subString = '';
    let matchIndex = baseString.search(regex)

    if (matchIndex >= 0) {
        matchIndex === 0 ? subString += `<span class="bold">${baseString.substring(0, query.length)}</span>` : subString += `<span>${baseString.substring(0, matchIndex)}</span><span class="bold">${baseString.substring(matchIndex, matchIndex + query.length)}</span>`
        let endString = baseString.substring(matchIndex + query.length, baseString.length)
        let newMatchIndex = endString.search(regex)
        
        if (newMatchIndex >= 0) {
            return subString += recurse(query, endString)
        } else {
            subString += `<span>${endString}</span>`
        }
        return subString
    }
}

module.exports = {
    filterResults,
    sortResults,
    recurse
}