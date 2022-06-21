const { Op } = require("sequelize");
const Sequelize = require("sequelize");
class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.priceQuery = "";
    this.timeQuery = "";
    this.queryCopy = "";
    this.ticketQuery = "";
    this.skip = "";
  }
  // search() {
  //   const keyword = this.queryStr.keyword
  //     ? {
  //         location: {
  //           $regex: this.queryStr.keyword,
  //           $options: "i",
  //         },
  //       }
  //     : {};
  //   console.log(keyword);
  //   this.query = this.query.findAll({ ...keyword });
  //   return this;
  // }
  filter() {
    this.queryCopy = { ...this.queryStr };
    // console.log(this.query);
    // console.log(this.queryCopy);
    //remove somefield from catagory
    const removeFields = [
      "page",
      "limit",
      "minPrice",
      "maxPrice",
      "fromDate",
      "toDate",
      "personCount",
    ];
    removeFields.forEach((key) => delete this.queryCopy[key]);
    // console.log("filter query");
    // console.log(this.queryCopy);
    const fromDate = this.queryStr.fromDate;
    const toDate = this.queryStr.toDate;
    this.query = this.query.findAndCountAll({
      where: {
        [Op.and]: [this.queryCopy, this.priceQuery, this.timeQuery],
      },
    });
    // console.log(this.timeFilter);
    // console.log(this.query);
    return this;
  }
  priceFilter() {
    const minPrice = this.queryStr.minPrice ? this.queryStr.minPrice : 1;
    const maxPrice = this.queryStr.maxPrice ? this.queryStr.maxPrice : 1000000;
    this.priceQuery = {
      price_per_seat: { [Op.between]: [minPrice, maxPrice] },
    };
    //console.log("price query");
   // console.log(this.priceQuery);
    return this;
  }
  timeFilter() {
    if (this.queryStr.fromDate && this.queryStr.toDate) {
      const fromDate = this.queryStr.fromDate;
      const toDate = this.queryStr.toDate;
      this.timeQuery = {
        [Op.and]: [
          (this.timeQuery = Sequelize.where(
            Sequelize.fn("date", Sequelize.col("departure_time")),
            ">=",
            fromDate
          )),
          Sequelize.where(
            Sequelize.fn("date", Sequelize.col("departure_time")),
            "<=",
            toDate
          ),
        ],
      };
    }
    return this;
  }
  TicketFilter() {
    if (this.queryStr.personCount) {
      const personCount = this.queryStr.personCount;
      this.ticketQuery = { total_available_seats: { [Op.gte]: personCount } };
    }
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    this.skip = resultPerPage * (currentPage - 1);
    // this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = Apifeatures;
