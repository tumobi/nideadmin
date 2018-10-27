<template>
  <div class="na-view-home">
    <div class="na-layout">
      <div class="na-header">
        <div class="na-logo">
          <img src="https://icarusion.gitee.io/iview/e1cf12c07bf6458992569e67927d767e.png" alt="NideAdmin">
        </div>
        <div class="na-nav">
          <div v-for="item in menus" :class="{active: item.active}" :key="item.name" class="item">
            <router-link :to="{name: item.route}">{{ item.name }}</router-link>
          </div>
        </div>
        <div class="na-user">
          <!-- 搜索 -->
          <div class="item">
            <Tooltip content="搜索菜单、内容" theme="light" placement="bottom-end">
              <Icon type="ios-search-outline" size="28"/>
            </Tooltip>
          </div>
          <!-- 全屏 -->
          <div class="item">
            <Tooltip content="开启全屏" theme="light" placement="bottom-end">
              <Icon type="ios-expand" size="28"/>
              <!-- <Icon type="ios-contract" size="28"/> -->
            </Tooltip>
          </div>
          <!-- 刷新 -->
          <div class="item">
            <Tooltip content="刷新页面" theme="light" placement="bottom-end">
              <Icon type="ios-refresh" size="28"/>
            </Tooltip>
          </div>
          <!-- 通知消息 -->
          <div class="item">
            <Dropdown>
              <Badge :count="1">
                <Icon type="ios-notifications-outline" size="28"></Icon>
              </Badge>
              <DropdownMenu slot="list">
                <DropdownItem>内容审核</DropdownItem>
                <DropdownItem>评论审核</DropdownItem>
                <DropdownItem>用户留言</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="item">
            <Dropdown>
              <Badge dot>
                <Avatar icon="ios-person" />
              </Badge>
              <DropdownMenu slot="list">
                <DropdownItem>账号设置</DropdownItem>
                <DropdownItem>修改密码</DropdownItem>
                <DropdownItem divided>
                  <div class="logout" @click="onLogout">退出登录</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="na-main">
        <div class="na-sider">
          <div class="title">控制台</div>
          <ul class="na-sidebar">
            <li v-for="item in currentMenu.children" :key="item.name">
              <router-link :to="{name: item.route}" :class="{active: item.active}">
                <Icon :type="item.icon" size="24"></Icon>
                <div class="text">{{ item.name }}</div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="na-content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import helper from '../libs/helper'
export default {
  name: 'Home',
  data: function () {
    return {
    }
  },
  computed: mapState([
    'menus',
    'currentMenu'
  ]),
  methods: {
    async onLogout () {
      await helper.removeStorage('admin_token')
      await helper.removeStorage('admin_user')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
