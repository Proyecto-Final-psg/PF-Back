const {getProducts} = require('../controller/functionsProduct')

const orderCbd = async (array, setOrder) =>{
    return array.sort(function(a,b){
        const numA = parseInt(a.cbd)
        const numB = parseInt(b.cbd)
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