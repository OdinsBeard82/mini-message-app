const BookInstance = require('../models/bookinstance');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate('book').exec();
    res.render('bookinstance_list', { title: 'BookInstance List', bookinstance_list: allBookInstances });
});

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec();
    if (bookinstance == null) { // No results.
        const err = new Error('Book instance not found');
        err.status = 404;
        return next(err);
    }
    res.render('bookinstance_detail', { title: 'BookInstance Detail', bookinstance });
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    res.render('bookinstance_form', { title: 'Create BookInstance' });
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // Validate and sanitize fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('bookinstance_form', {
                title: 'Create BookInstance',
                bookinstance: bookinstance,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            await bookinstance.save();
            res.redirect(bookinstance.url);
        }
    })
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec();
    if (bookinstance == null) { // No results.
        res.redirect('/catalog/bookinstances');
    }
    res.render('bookinstance_delete', { title: 'Delete BookInstance', bookinstance });
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    await BookInstance.findByIdAndRemove(req.body.id);
    res.redirect('/catalog/bookinstances');
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec();
    if (bookinstance == null) { // No results.
        const err = new Error('Book instance not found');
        err.status = 404;
        return next(err);
    }
    res.render('bookinstance_form', { title: 'Update BookInstance', bookinstance });
});

// Handle BookInstance update on POST.
exports.bookinstance_update_post = [
    // Validate and sanitize fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        // Create a BookInstance object with escaped/trimmed data and old id.
        const bookinstance = new BookInstance({
            _id: req.params.id, // This is required, or a new ID will be assigned!
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            res.render('bookinstance_form', {
                title: 'Update BookInstance',
                bookinstance: bookinstance,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            await BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {});
            res.redirect(bookinstance.url);
        }
    })
];
