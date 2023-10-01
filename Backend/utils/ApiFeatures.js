class ApiFeatures{

    constructor(query , querystr){
        this.query = query;
        this.querystr = querystr
    }

    search(){
        const keyword = this.querystr.keyword ? { name : {$regex :  this.querystr.keyword , $options : "i" }}:{};
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.querystr};
        const removeFields = ["keyword" , "page" , "limit"]
        removeFields.forEach((key) => delete queryCopy[key]);

        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|It|Ite)\b/g, (key) =>`$${key}`);
        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page)  || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }

}

module.exports = ApiFeatures