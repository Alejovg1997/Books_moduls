const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); //importamos el modulo de node para generar ids unicos

//modulos internos
const { readFile, writeFile } = require("../files.js");

const FILE_NAME = "./DB/books.txt";

// Rutas de la API

//API
//listar mascotas
router.get("/", (req, res) => {
    let books = readFile(FILE_NAME);

    const { search } = req.query;
    if (search) {
        books = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    }
    res.json(books);
});


//crear mascotas
router.post("/", (req, res) => {
    try {
        //leer el archivo de mascotas
        const data = readFile(FILE_NAME);
        //agregar la nueva mascota (agregar ID)
        const newBook = req.body;
        newBook.id = uuidv4();
        console.log(newBook);
        console.log(data);
        data.push(newBook);

        //escribir en el archivo
        writeFile(FILE_NAME, data);
        res.json({ message: "el libro fue creada con exito" });
    } catch (err) {
        console.error(err);
        res.json({ message: "Error al crear el libro" });
    }
});

//obtener una sola mascota
router.get("/:id", (req, res) => {
    //:id porque es un parametro
    console.log(req.params.id);
    //Guardamos el id que viene en la url
    const id = req.params.id;
    //leer el archivo de mascotas
    const books = readFile(FILE_NAME);
    //buscar la mascota con el id que recibimos
    const bookFound = books.find((book) => book.id === id);
    if (!bookFound) {
        res.status(404).json({ ok: false, message: "Pet not found" });
        return;
    }
    res.send({ ok: true, book: bookFound });
});

//actualizar una mascota
router.put("/:id", (req, res) => {
    //:id porque es un parametro
    console.log(req.params.id);
    //Guardamos el id que viene en la url
    const id = req.params.id;
    //leer el archivo de mascotas
    const books = readFile(FILE_NAME);
    //buscar la mascota con el id que recibimos
    const bookIndex = books.findIndex((pet) => pet.id === id);
    if (bookIndex < 0) {
        res.status(404).json({ ok: false, message: "book not found" });
        return;
    }
    let book = books[bookIndex]; //obtenemos la mascota del arreglo
    book = { ...pet, ...req.body }; //modificamos los valores de la mascota
    books[bookIndex] = book; //modificamos la mascota en el arreglo
    writeFile(FILE_NAME, books); //escribimos el arreglo en el archivo
    //si la mascota exite, modificar sus valores y almacenarlos en el archivo

    res.send({ ok: true, book: book });
});

//Eliminar una macota
router.delete("/:id", (req, res) => {
    //:id porque es un parametro
    console.log(req.params.id);
    //Guardamos el id que viene en la url
    const id = req.params.id;
    //leer el archivo de mascotas
    const books = readFile(FILE_NAME);
    //buscar la mascota con el id que recibimos
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex < 0) {
        res.status(404).json({ ok: false, message: "book not found" });
        return;
    }
    //Eliminar la mascota que esté en la posicion petIndex
    books.splice(bookIndex, 1);
    writeFile(FILE_NAME, books); //escribimos el arreglo en el archivo
    //si la mascota exite, modificar sus valores y almacenarlos en el archivo
    res.send({ ok: true, pet: true });
});

//post, put y patch tienen body
router.post("/", (req, res) => {
    console.log(req.body);
    res.send("book created");
});

module.exports = router;