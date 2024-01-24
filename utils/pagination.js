function paginate(array, pageNumber, pageSize) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return array.slice(start, end);
  }
  
  module.exports = paginate;
  