  
  
  function between(min, max) {
    return Math.floor(
        Math.random() * (max-min) + min
    )
}

function generateSpace(){
    return new Array(between(0, 10)).fill(' ').join('')
}

module.exports = {
    between: between,
    generateSpace : generateSpace
}