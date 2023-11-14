const{Sequelize}=require('sequelize');
const setUpModels = require('../../DB/models');


const sequelize=new Sequelize('books_DB','postgres','Alejandrov19',{
    host:'localhost',
    dialect:'postgres',
    logging:true,
    port:5433
});

setUpModels(sequelize);

module.exports=sequelize;