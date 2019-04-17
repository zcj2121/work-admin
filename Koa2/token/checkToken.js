const jwt = require('jsonwebtoken');

// 必须要有Token (需要用户登录)
module.exports = async ( ctx, next ) => {
    const authorization = ctx.get('Authorization'); // request 带过来的 token
    if (authorization == '') {
        ctx.body = {
            state: 1004,
            msg: '未登录或登录失效'
        }
        return false
    }
    const token = authorization;
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, 'zcj2121');     //如果token过期或验证失败，将抛出错误
        ctx.userInfo = tokenContent
    } catch (err) {
        ctx.body = {
            state: 1004,
            msg: '登录验证失效'
        }
    }
    await next();
}