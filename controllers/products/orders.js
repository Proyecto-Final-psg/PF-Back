const { getProducts } = require("./functionsProduct")

const orderCbd = async (category, setOrder) =>{
    const arrayFilter =  await filterByCategory(await getProducts(), category)
    return arrayFilter.sort(function(a,b){
        const numA = parseInt(a.cbd)
        const numB = parseInt(b.cbd)
        if(setOrder === 'az'){
            if(numA<numB) return -1
        } 
        if(setOrder === 'za'){
            if(numA>numB) return -1}  
    })
}

const orderThc = async (category, setOrder) =>{
    const arrayFilter =  await filterByCategory(await getProducts(), category)

    return arrayFilter.sort(function(a,b){
        const numA = parseInt(a.thc)
        const numB = parseInt(b.thc)
        if(setOrder === 'az'){
            if(numA<numB) return -1
        } 
        if(setOrder === 'za'){
            if(numA>numB) return -1}  
    })
}

const orderPrice = async (category, setOrder) =>{
   const arrayFilter =  await filterByCategory(await getProducts(), category)
  
    return  arrayFilter.sort(function(a,b){
        const numA = parseInt(a.price)
        const numB = parseInt(b.price)
        if(setOrder === 'az'){
            if(numA<numB) return -1
        } 
        if(setOrder === 'za'){
            if(numA>numB) return -1}  
    })
}

const filterByCategory = async (array, category) => {
    const filteredProducts = array.filter(prod => prod.categories.includes(category))
    return filteredProducts
}

module.exports = {orderCbd, orderThc, orderPrice, filterByCategory}