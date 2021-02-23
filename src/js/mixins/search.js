const filterResults = (query, data)  => {
    return data.filter(item => 
        item.name.toLowerCase().includes(query) === true
    )
}

const sortResults = () => {
    console.log(3, 4)
}

const highlightMatches = (word) => {
    return word.split('')
        .map(char => 
            `<span>${char}</span>`
        )
        .join('')
}

module.exports = {
    filterResults,
    sortResults,
    highlightMatches
}