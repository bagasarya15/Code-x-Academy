import models from "../models/init-models.js";

const GetProduct = async (req, res)=> {
    try {
        const data = await models.product.findAll({
            attributes:["name", "description", "price", "image"],
            include: [{
                model: models.product_category, as:'category',
                attributes: ["name"],
            }]
        });
        let succes = {
            message:'success',
            result:data, 
            status:'202', 
        }

        res.status(200).send(succes)

        res.status(200).send(succes)
    } catch (error) {
        res.send(error.message)
    }
}

const GetProductById = async(req, res) => {
    try {
        // const data = await models.product.findByPk(req.params.id)

        const data = await models.product.findOne({
            where:{id: req.params.id},
            attributes:["name", "description", "price", "image"],
            include: [{
                model: models.product_category, as:'category',
                attributes: ["name"],
            }]
        });

        if(!data) throw new Error('Data tidak ditemukan!')
        
        let succes = {
            message:'success',
            result:data, 
            status:'202', 
        }

        res.status(200).send(succes)

        res.status(200).send(succes)
    } catch (error) {
        res.send(error.message)
    }
}

const CreateProduct = async (req, res) => {
    try {
        const data = await models.product.create({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            price: req.body.price,
            image: req.body.image
        })

        let success = {
            message: 'Data produk berhasil ditambahkan',
            status: '202',
            result: data    
        }

        res.status(202).send(success)

    } catch (error) {
        res.send(error.message)
    }
}

export default{
    GetProduct,
    GetProductById,
    CreateProduct
}