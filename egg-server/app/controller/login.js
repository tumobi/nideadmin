'use strict';
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');
const only = require('only');
const BaseController = require('./base');
const menus = require('../../config/menu');

class LoginController extends BaseController {
  async login() {
    const username = this.post('username');
    const password = this.post('password');
    const captcha = this.post('captcha');
    const key = this.post('key');

    // TODO 验证参数
    const rule = {
      username: { type: 'string', min: 2, max: 20 },
      password: { type: 'string', min: 6 },
      captcha: { type: 'string', min: 4, max: 4 },
      key: { type: 'string', min: 36, max: 36 },
    };
    try {
      this.ctx.validate(rule, { username, password, captcha, key });
    } catch (err) {
      this.error(400, '请求参数不合法');
      return;
    }
    // 判断验证码
    const captchaCache = await this.app.cache.get(key);
    console.log(captchaCache, captcha);
    if (!captchaCache || captchaCache !== captcha.toLowerCase()) {
      this.error(400, '验证码错误');
      return;
    }

    const user = await this.ctx.model.User.findByUsername(username);
    if (!user) {
      this.error(400, '用户不存在');
      return;
    }

    const passwordMd5 = md5(password + 'nideadmin' + user.password_salt);
    if (passwordMd5 !== user.password) {
      this.error(400, '用户名或密码错误');
      return;
    }

    // 返回登录成功信息
    const token = jwt.sign({ user_id: 1 }, this.config.jwt.secret);
    this.success({ user: only(user, [ 'id', 'username', 'avatar' ]), token, menus });
  }

  async captcha() {
    const key = this.query('key');
    const rule = {
      key: { type: 'string', min: 36, max: 36 },
    };
    try {
      this.ctx.validate(rule, { key });
    } catch (err) {
      this.error(400, '请求参数不合法');
      return;
    }
    const captcha = svgCaptcha.create({
      size: 4, // 字符数量
      noise: 4, // 干扰线数量
      color: true, // 彩色显示
      ignoreChars: '0o1i', // 忽略的字符
      background: '#f8f8f9', // 背景色
    });
    await this.app.cache.set(key, captcha.text.toLowerCase());
    this.ctx.set('Content-Type', 'image/svg+xml');
    this.ctx.body = captcha.data;
  }
}

module.exports = LoginController;
