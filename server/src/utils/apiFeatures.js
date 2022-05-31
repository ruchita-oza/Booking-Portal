const { Op } = require("sequelize");
class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.priceQuery = "";
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          location: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.findAll({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    console.log(this.query);
    console.log(queryCopy);
    //remove somefield from catagory
    const removeFields = ["keyword", "page", "limit", "minPrice", "maxPrice"];
    removeFields.forEach((key) => delete queryCopy[key]);
    console.log("filter query");
    console.log(queryCopy);
    this.query = this.query.findAndCountAll({
      where: { [Op.and]: [queryCopy, this.priceQuery] },
    });
    // console.log(this.query);
    return this;
  }
  priceFilter() {
    const minPrice = this.queryStr.minPrice ? this.queryStr.minPrice : 1;
    const maxPrice = this.queryStr.maxPrice ? this.queryStr.maxPrice : 1000000;
    this.priceQuery = { pricePerSeat: { [Op.between]: [minPrice, maxPrice] } };
    console.log("price query");
    console.log(this.priceQuery);
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = Apifeatures;
