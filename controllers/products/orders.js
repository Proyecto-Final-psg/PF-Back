
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

const orderThc = async (array, setOrder) =>{
    return array.sort(function(a,b){
        const numA = parseInt(a.thc)
        const numB = parseInt(b.thc)
        if(setOrder === true){
            if(numA<numB) return -1
        } 
        if(setOrder === false){
            if(numA>numB) return -1              }  
    })
}

const orderPrice = async (array, setOrder) =>{
    return array.sort(function(a,b){
        const numA = parseInt(a.price)
        const numB = parseInt(b.price)
        if(setOrder === true){
            if(numA<numB) return -1
        } 
        if(setOrder === false){
            if(numA>numB) return -1              }  
    })
}

const filterByCategory = async (array, category) => {
    const filteredProducts = array.filter(prod => prod.categories.includes(category))
    return filteredProducts
}

module.exports = {orderCbd, orderThc, orderPrice, filterByCategory}