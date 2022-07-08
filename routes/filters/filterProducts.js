const { getProducts } = require('../controller/functionsProduct')

const filterByCategory = async (category) => {
    const allProducts = await getProducts()
    const filteredProducts = allProducts.filter(prod => prod.categories.includes(category))
    return filteredProducts
}

module.exports = {
    filterByCategory
}