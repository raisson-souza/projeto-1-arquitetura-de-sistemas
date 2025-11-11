import mongoose from "mongoose"

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.ORDER_DB_CONNECTION_URL);
        console.log('MongoDB conectado com sucesso ao order-service.');
    } catch (error) {
        console.error('Erro ao conectar com o MongoDB:', error.message);
    }
}

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false })

const OrderSchema = new mongoose.Schema({
    clientId: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    products: [ProductSchema],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'orders',
})

const OrderModel = mongoose.model('Order', OrderSchema)

export { OrderModel, connectMongoose }
