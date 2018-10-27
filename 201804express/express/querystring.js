//把一个查询字符串转成一个JS对象
// name=zfpx&age=9
//["name=zfpx","age=9"]
exports.parse = (str, sep = '&', eq = '=') => {
    let fields = str.split(sep);
    let queryObj = {};
    fields.forEach(field => {
        let [key, value] = field.split(eq);
        queryObj[key] = value;
    });
    return queryObj;
}