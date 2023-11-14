const{Model,DataTypes}=require('sequelize');
const BOOK_TABLE='books';
const bookSchema={
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
title:{
    type:DataTypes.STRING,
    allowNull:false
},
author:{
    type:DataTypes.STRING,
    allowNull:false
},
isbn:{
    type:DataTypes.INTEGER,
    allowNull:false
},
language:{
    type:DataTypes.STRING,
    allowNull:false
},
price:{
    type:DataTypes.INTEGER,
    allowNull:false
},
isAvailable:{
    type:DataTypes.STRING,
    allowNull:false
},

};
class bookModel extends Model{
    static associate(models){

    }
        static config(sequelize){
            return{
                sequelize,
                modelName:'book',
                tableName:BOOK_TABLE,
                timestamps:false
            }
        }
    }     
    module.exports={bookModel,bookSchema,BOOK_TABLE};       
