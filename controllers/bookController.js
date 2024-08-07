var Book = require('../models/book');
var asyncHandler = require('express-async-handler');

// Display list of all Books
exports.book_list = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book list');
});

// Display detail page for a specific book
exports.book_detail = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
});

// Display book create form on GET
exports.book_create_get = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book create GET');
});

// Handle book create on POST
exports.book_create_post = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book create POST');
});

// Display book delete form on GET
exports.book_delete_get = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete GET');
});

// Handle book delete on POST
exports.book_delete_post = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete POST');
});

// Display book update form on GET
exports.book_update_get = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update GET');
});

// Handle book update on POST
exports.book_update_post = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update POST');
});

// Index route
exports.index = asyncHandler(async function (req, res, next) {
    res.send('NOT IMPLEMENTED: Site Home Page');
});
