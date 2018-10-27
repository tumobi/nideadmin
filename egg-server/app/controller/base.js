'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 响应成功 json
  success(data) {
    this.ctx.body = { code: 200, message: 'success', data };
    return;
  }

  // 响应错误 json
  error(code, message) {
    this.ctx.body = { code, message, data: null };
  }

  // 获取 post 表单数据
  post(name) {
    return this.ctx.request.body[name];
  }

  // 获取 get 数据
  query(name) {
    return this.ctx.query[name];
  }
}

module.exports = BaseController;
