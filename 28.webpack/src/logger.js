//在开发环境下打印日志，在生产环境下不打印日志
export default function (...args) {
    //如果当前是开发环境的话
    if (process.env.NODE_ENV == 'development')
        console.log(...args);
}