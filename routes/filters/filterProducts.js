import { Op } from "sequelize";
import Product from "../../models/Product";



const getProductByName = async(name) => {
    let allProducts = await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    })
    
    if(allProducts) return allProducts
    return 'No se encontro el producto buscado'
}

module.exports= {
    getProductByName
}
