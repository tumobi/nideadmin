
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名，用作登录',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '密码',
  `password_salt` varchar(6) NOT NULL DEFAULT '' COMMENT '密码盐',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间，不为 NULL 则表示数据已被软删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'admin', 'https://gitee.com/uploads/33/1446033_tumobi.png?1502068801', '81101c28a48e7408be53c6a0e1834abe', '389238', '2018-11-21 23:34:09', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
