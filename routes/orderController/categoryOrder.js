const {getProducts} = require('../controller/functionsProduct')

const orderCbd = async (array, setOrder) =>{
    return array.sort(function(a,b){
        const numA = parseInt(a.id)
        const numB = parseInt(b.id)
        if(setOrder === true){
            if(numA<numB) return -1
        } 
        if(setOrder === false){
            if(numA>numB) return -1              }  
    })
}

module.exports = {
    orderCbd
}