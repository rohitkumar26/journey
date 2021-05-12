function paginatedResult(model) {
    return async (req, res, next) => {
        if (!req.query.page)
            req.query.page = 1;
        if (!req.query.limit)
            req.query.limit = 5;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);


        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;


        const results = {};

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().sort({ date: -1 }).limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = paginatedResult;