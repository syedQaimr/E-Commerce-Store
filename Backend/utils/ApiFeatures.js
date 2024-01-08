class ApiFeatures {

    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr
    }

    search() {
        const keyword = this.querystr.keyword ? { name: { $regex: this.querystr.keyword, $options: "i" } } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // Create a copy of the query string parameters.

        const queryCopy = { ...this.querystr };
        // Define fields to be removed from the query string.

        const removeFields = ["keyword", "page", "limit"]
        // Remove specified fields from the query string copy.

        removeFields.forEach((key) => delete queryCopy[key]);
        // Convert the modified query string copy to JSON format.


        let querystr = JSON.stringify(queryCopy);
        // Replace specific keywords in the query string for MongoDB operators.

        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // Apply the filtered query to the current query.

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    // Method to handle pagination based on the provided resultPerPage parameter.


    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }

}

module.exports = ApiFeatures