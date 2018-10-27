'use strict';
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const BaseController = require('./base');
const menus = require('../../config/menu');

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
    console.log(this.ctx.session.captcha, captcha);
    // 判断验证码
    if (!this.ctx.session.captcha || this.ctx.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
      this.error(400, '验证码错误');
      return;
    }

    if (username !== 'admin' || password !== 'nideadmin') {
      this.error(400, '用户名或密码错误');
      return;
    }

    // 返回登录成功信息
    const user = { id: 1, username: 'admin', avatar: '' };
    const token = jwt.sign({ user_id: 1 }, this.config.jwt.secret);
    this.success({ user, token, menus });
  }

  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4, // 字符数量
      noise: 4, // 干扰线数量
      color: true, // 彩色显示
      ignoreChars: '0o1i', // 忽略的字符
      background: '#f8f8f9', // 背景色
    });
    this.ctx.session.captcha = captcha.text;
    this.ctx.set('Content-Type', 'image/svg+xml');
    this.ctx.body = captcha.data;
  }
}

module.exports = LoginController;
