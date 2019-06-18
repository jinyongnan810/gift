SET FOREIGN_KEY_CHECKS=0;
drop database gift;
create database gift;
use gift;
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` bigint(20) NOT NULL,
  `password` nvarchar(64) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户表';
insert into tb_user values(201493062,"xxx");

DROP TABLE IF EXISTS `tb_gift`;
CREATE TABLE `tb_gift` (
  `id` bigint(20) NOT NULL,
  `title` nvarchar(64) NOT NULL,
  `brief` nvarchar(512) NOT NULL COMMENT '标题',
  `status` int DEFAULT NULL COMMENT '状态：0已送出，1待送出，2删除',
  `img` varchar(512) DEFAULT NULL COMMENT '图片',
  `type` int DEFAULT NULL COMMENT '0书，1杂货',
  `detail` text DEFAULT NULL COMMENT '详情',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='礼物表';


DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order` (
  `id` bigint(20) NOT NULL,
  `giftid` bigint(20) NOT NULL,
  `gifttitle` nvarchar(64) NOT NULL COMMENT '标题',
  `giftimg` varchar(512) NOT NULL COMMENT '图片',
  `userid` bigint(20) NOT NULL COMMENT '接收人id',
  `username` nvarchar(64) NOT NULL COMMENT '接收人',
  `address` nvarchar(64) NOT NULL COMMENT '收货地址',
  `contact` nvarchar(64) NOT NULL COMMENT '联系方式',
  `status` int NOT NULL COMMENT '状态：0待送出，1完成，2取消',
  `created` datetime NOT NULL COMMENT '创建',
  `finished` datetime DEFAULT NULL COMMENT '完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='送货表';



