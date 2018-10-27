'use strict';
const jwt = require('jsonwebtoken');
const BaseController = require('./base');

class LoginController extends BaseController {
  async login() {
    const username = this.post('username');
    const password = this.post('password');
    const captcha = this.post('captcha');

    // TODO 验证参数
    const rule = {
      username: { type: 'string', min: 2, max: 20 },
      password: { type: 'string', min: 6 },
      captcha: { type: 'string', min: 4, max: 4 },
    };
    try {
      this.ctx.validate(rule, { username, password, captcha });
    } catch (err) {
      this.error(400, '请求参数不合法');
      return;
    }

    if (username !== 'admin' || password !== 'nideadmin') {
      this.error(400, '用户名或密码错误');
      return;
    }

    // 返回登录成功信息
    const user = { id: 1, username: 'admin', avatar: '' };
    const token = jwt.sign({ user_id: 1 }, this.config.jwt.secret);
    this.success({ user, token });
  }
}

module.exports = LoginController;
