//importar
const{bookModel, bookSchema}=require('./book.model')

function setUpModels(sequelize){
    bookModel.init(bookSchema,bookModel.config(sequelize));
}
module.exports=setUpModels;