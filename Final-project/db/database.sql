-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: database
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `database`
--

/*!40000 DROP DATABASE IF EXISTS `database`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `database` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `database`;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `userid` bigint(20) NOT NULL COMMENT 'userid',
  `address` varchar(200) NOT NULL COMMENT 'address',
  `name` varchar(200) NOT NULL COMMENT 'Consignee',
  `phone` varchar(200) NOT NULL COMMENT 'Phone Number',
  `isdefault` varchar(200) NOT NULL COMMENT 'yesnoDefault[yes/no]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='address';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'2025-04-23 06:58:54',11,'宇宙银河系金星1号','金某','13823888881','yes'),(2,'2025-04-23 06:58:54',12,'宇宙银河系木星1号','木某','13823888882','yes'),(3,'2025-04-23 06:58:54',13,'宇宙银河系水星1号','水某','13823888883','yes'),(4,'2025-04-23 06:58:54',14,'宇宙银河系火星1号','火某','13823888884','yes'),(5,'2025-04-23 06:58:54',15,'宇宙银河系土星1号','土某','13823888885','yes'),(6,'2025-04-23 06:58:54',16,'宇宙银河系月球1号','月某','13823888886','yes'),(7,'2025-04-23 06:58:54',17,'宇宙银河系黑洞1号','黑某','13823888887','yes'),(8,'2025-04-23 06:58:54',18,'宇宙银河系地球1号','地某','13823888888','yes'),(9,'2025-04-23 07:04:51',19,'北京路9号','王强','13823888885','yes');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `tablename` varchar(200) DEFAULT 'shangpinxinxi' COMMENT 'Commodity表名',
  `userid` bigint(20) NOT NULL COMMENT 'userid',
  `goodid` bigint(20) NOT NULL COMMENT 'Commodityid',
  `goodname` varchar(200) DEFAULT NULL COMMENT 'Product name',
  `picture` longtext COMMENT 'Picture',
  `buynumber` int(11) NOT NULL COMMENT 'BuyAmount',
  `price` float DEFAULT NULL COMMENT '单价',
  `discountprice` float DEFAULT NULL COMMENT '会员价',
  `goodtype` varchar(200) DEFAULT NULL COMMENT 'Commodity类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Shopping cart表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '配置参数Name',
  `value` varchar(100) DEFAULT NULL COMMENT '配置参数Picture',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='配置文件';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'picture1','upload/picture1.jpg'),(2,'picture2','upload/picture2.jpg'),(3,'picture3','upload/picture3.jpg');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussshangpinxinxi`
--

DROP TABLE IF EXISTS `discussshangpinxinxi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussshangpinxinxi` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `refid` bigint(20) NOT NULL COMMENT '关联表id',
  `userid` bigint(20) NOT NULL COMMENT 'userid',
  `avatarurl` longtext COMMENT 'Profile picture',
  `nickname` varchar(200) DEFAULT NULL COMMENT 'User',
  `content` longtext NOT NULL COMMENT 'CommentContent',
  `reply` longtext COMMENT '回复Content',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Commodity informationComment表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussshangpinxinxi`
--

LOCK TABLES `discussshangpinxinxi` WRITE;
/*!40000 ALTER TABLE `discussshangpinxinxi` DISABLE KEYS */;
INSERT INTO `discussshangpinxinxi` VALUES (1,'2025-04-23 07:08:17',39,1,'',NULL,'好','谢谢');
/*!40000 ALTER TABLE `discussshangpinxinxi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `title` varchar(200) NOT NULL COMMENT 'Title',
  `introduction` longtext COMMENT 'Brief Introduction',
  `picture` longtext NOT NULL COMMENT 'Picture',
  `content` longtext NOT NULL COMMENT 'Content',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8 COMMENT='News';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (81,'2025-04-23 06:58:54','有梦想，就要努力去实现','不管你想要怎样的生活，你都要去努力争取，不多尝试一些事情怎么知道自己适合什么、不适合什么呢?你说你喜欢读书，让我给你列书单，你还问我哪里有那么多时间看书;你说自己梦想的职业yes广告文案，问我如何成为一个文案，应该具备哪些素质;你说你计划晨跑，但总yes因为学习、工作辛苦或者身体不舒服第二天起不了床;你说你一直梦想一个人去长途旅行，但yes没钱，父母觉得危险。','upload/news_picture1.jpg','<p>不管你想要怎样的生活，你都要去努力争取，不多尝试一些事情怎么知道自己适合什么、不适合什么呢?</p><p>你说你喜欢读书，让我给你列书单，你还问我哪里有那么多时间看书;你说自己梦想的职业yes广告文案，问我如何成为一个文案，应该具备哪些素质;你说你计划晨跑，但总yes因为学习、工作辛苦或者身体不舒服第二天起不了床;你说你一直梦想一个人去长途旅行，但yes没钱，父母觉得危险。其实，我已经厌倦了你这样说说而已的把戏，我觉得就算我告诉你如何去做，你也不会照做，因为你根本什么都不做。</p><p>真正有行动力的人不需要别人告诉他如何做，因为他已经在做了。就算碰到问题，他也会自己想办法，自己动手去解决或者主动寻求可以帮助他的人，而不yes等着别人为自己解决问题。</p><p>首先要学习独立思考。花一点时间想一下自己喜欢什么，梦想yes什么，不要别人说想环游世界，你就说你的梦想yes环游世界。</p><p>很多人说现实束缚了自己，其实在这个世界上，我们一直都可以有很多Choose，生活的决定权也—直都在自己手上，只yes我们缺乏行动力而已。</p><p>如果你觉得安于现状yes你想要的，那Choose安于现状就会让你幸福和满足;如果你不甘平庸，Choose一条改变、进取和奋斗的道路，在这个追求的过程中，你也一样会感到快乐。所谓的 Success，即yes按照自己想要的生活方式生活。最糟糕的Status，莫过于当你想要Choose一条不甘平庸、改变、进取和奋斗的道路时，却以一种安于现状的方式生活，最后抱怨自己没有得到想要的人生。</p><p>因为喜欢，你不yes在苦苦坚持，也因为喜欢，你愿意投入时间、精力，长久以往，获得 Success就yes自然而然的事情。</p>'),(82,'2025-04-23 06:58:54','又yes一年毕业季','又yes一年毕业季，感慨万千，还记的自己刚进学校那时候的情景，我拖着沉重的行李箱站在偌大的教学楼前面，感叹自己未来的日子即将在这个陌生的校园里度过，而如今斗转星移，浮光掠影，弹指之间，那些青葱岁月如同白驹过隙般悄然从指缝溜走。过去的种种在胸口交集纠结，像打翻的五味瓶，甜蜜，酸楚，苦涩，一并涌上心头。','upload/news_picture2.jpg','<p>又yes一年毕业季，感慨万千，还记的自己刚进学校那时候的情景，我拖着沉重的行李箱站在偌大的教学楼前面，感叹自己未来的日子即将在这个陌生的校园里度过，而如今斗转星移，浮光掠影，弹指之间，那些青葱岁月如同白驹过隙般悄然从指缝溜走。</p><p>过去的种种在胸口交集纠结，像打翻的五味瓶，甜蜜，酸楚，苦涩，一并涌上心头。一直都yes晚会的忠实参与者，无论yes台前还yes幕后，忽然间，角色转变，那种感觉确实难以用语言表达。</p><p>	过去的三年，总yes默默地期盼着这个好雨时节，因为这时候，会有灿烂的阳光，会有满目的百花争艳，会有香甜的冰激凌，这yes个毕业的季节，当时不经世事的我们会殷切地期待学校那一大堆的活动，期待穿上绚丽的演出服或者礼仪服，站在大礼堂镁光灯下尽情挥洒我们的澎拜的激情。</p><p>百感交集，隔岸观火与身临其境的感觉竟yes如此不同。从来没想过一场晚会送走的yes我们自己的时候会yes怎样的感情，毕业就真的意味着结束吗?倔强的我们不愿意承认，谢谢学弟学妹们慷慨的将这次的主题定为“我们在这里”。我知道，这可能yes他们对我们这些过来人的尊敬和施舍。</p><p>没有为这场晚会排练、奔波，没有为班级、学生会、文学院出点力，还真有点不习惯，百般无奈中，用“工作忙”个万能的借口来搪塞自己，欺骗别人。其实自己心里明白，那只yes在逃避，只yes不愿面对繁华落幕后的萧条和落寞。大四了，大家各奔东西，想凑齐班上的人真的yes难上加难，敏燕从越南回来，刚落地就匆匆回了学校，那么恋家的人也启程回来了，睿睿学姐也yes从家赶来跟我们团圆。大家—如既往的寒暄、打趣、调侃对方，似乎一切又回到了当初的单纯美好。</p><p>看着舞台上活泼可爱的学弟学妹们，如同一群机灵的小精灵，清澈的眼神，稚嫩的肢体，轻快地步伐，用他们那热情洋溢的舞姿渲染着在场的每一个人，我知道，我不应该羡慕嫉妒他们，不应该顾自怜惜逝去的青春，不应该感叹夕阳无限好，曾经，我们也拥有过，曾经，我们也年轻过，曾经，我们也灿烂过。我深深地告诉自己，人生的每个阶段都yes美的，年轻有年轻的活力，成熟也有成熟的魅力。多—份稳重、淡然、优雅，也yes漫漫时光掠影遗留下的.珍贵赏赐。</p>'),(83,'2025-04-23 06:58:54','挫折路上，坚持常在心间','回头看看，你会不会发现，曾经的你在这里摔倒过;回头看看，你yesno发现，一次次地重复着，却从没爬起过。而如今，让我们把视线转向前方，那一道道金色的弧线，yes流星飞逝的痕迹，或yes Success运行的轨道。今天的你，yesno要扬帆起航，让幸福来敲门?清晨的太阳撒向大地，神奇的宇宙赋予它神奇的色彩，大自然沐浴着春光，世界因太阳的照射而精彩，林中百鸟啾啾，河水轻轻流淌，汇成清宁的山间小调。','upload/news_picture3.jpg','<p>回头看看，你会不会发现，曾经的你在这里摔倒过;回头看看，你yesno发现，一次次地重复着，却从没爬起过。而如今，让我们把视线转向前方，那一道道金色的弧线，yes流星飞逝的痕迹，或yes Success运行的轨道。今天的你，yesno要扬帆起航，让幸福来敲门?</p><p>清晨的太阳撒向大地，神奇的宇宙赋予它神奇的色彩，大自然沐浴着春光，世界因太阳的照射而精彩，林中百鸟啾啾，河水轻轻流淌，汇成清宁的山间小调。</p><p>yes的，面对道途上那无情的嘲讽，面对步伐中那重复的摔跤，面对激流与硬石之间猛烈的碰撞，我们必须Choose那富于阴雨，却最终见到彩虹的荆棘路。也许，经历了那暴风雨的洗礼，我们便会变得自信，幸福也随之而来。</p><p>司马迁屡遭羞辱，却依然在狱中撰写《史记》，作为一名史学家，不因王权而极度赞赏，也不因卑微而极度批判，然而他在坚持自己操守的同时，却依然要受统治阶级的阻碍，他似乎无权Choose自己的本职。但yes，他不顾于此，只yes在面对道途的阻隔之时，他依然Choose了走下去的信念。终于一部开山巨作《史记》诞生，为后人留下一份馈赠，也许在他完成毕生的杰作之时，他微微地笑了，没有什么比梦想实现更快乐的了......</p><p>	或许正如“长风破浪会有时，直挂云帆济沧海”一般，欣欣然地走向看似深渊的崎岖路，而在一番耕耘之后，便会发现这里另有一番天地。也许这就yes困难与快乐的交融。</p><p>也许在形形色色的社会中，我们常能看到一份坚持，一份自信，但这里却还有一类人。这类人在暴风雨来临之际，只会闪躲，从未懂得这也yes一种历炼，这何尝不yes一份快乐。在阴暗的角落里，总yes独自在哭，带着伤愁，看不到一点希望。</p><p>我们不能堕落于此，而要像海燕那般，在苍茫的大海上，高傲地飞翔，任何事物都无法阻挡，任何事都yes幸福快乐的。</p>'),(84,'2025-04-23 06:58:54','挫折yes另一个生命的开端','当遇到挫折或 Failure，你yes看见 Failure还yes看见机会?挫折yes我们每个人成长的必经之路，它不yes你想有就有，想没有就没有的。有句名言说的好，如果你想一生摆脱苦难，你就得yes神或者yes死尸。这句话形象地说明了挫折yes伴随着人生的，yes谁都逃不掉的。','upload/news_picture4.jpg','<p>当遇到挫折或 Failure，你yes看见 Failure还yes看见机会?</p><p>挫折yes我们每个人成长的必经之路，它不yes你想有就有，想没有就没有的。有句名言说的好，如果你想一生摆脱苦难，你就得yes神或者yes死尸。这句话形象地说明了挫折yes伴随着人生的，yes谁都逃不掉的。</p><p>人生在世，从古到今，不分天子平民，机遇虽有不同，但总不免有身陷困境或遭遇难题之处，这时候唯有通权达变，才能使人转危为安，甚至反败为胜。</p><p>大部分的人，一生当中，最痛苦的经验yes失去所爱的人，其次yes丢掉一份工作。其实，经得起考验的人，就算yes被开除也不会惊慌，要学会面对。</p><p>	“塞翁失马，焉知非福。”人生的道路，并不yes每一步都迈向 Success，这就yes追求的意义。我们还要认识到一点，挫折作为一种情绪Status和一种个人体验，各人的耐受性yes大不相同的，有的人经历了一次次挫折，就能够坚忍不拔，百折不挠;有的人稍遇挫折便意志消沉，一蹶不振。所以，挫折感yes一种主观感受，因为人的目的和需要不同， Success标准不同，所以同一种活动对于不同的人可能会造成不同的挫折感受。</p><p>凡事皆以平常心来看待，对于生命顺逆不要太执著。能够“破我执”yes很高层的人生境界。</p><p>人事的艰难就yes一种考验。就像—支剑要有磨刀来磨，剑才会利:一块璞玉要有粗石来磨，才会发出耀眼的光芒。我们能够做到的，只yes如何减少、避免那些由于自身的原因所造成的挫折，而在遇到痛苦和挫折之后，则力求化解痛苦，争取幸福。我们要知道，痛苦和挫折yes双重性的，它既yes我们人生中难以完全避免的，也yes我们在争取 Success时，不可缺少的一种动力。因为我认为，推动我们奋斗的力量，不仅仅yes对 Success的渴望，还有为摆脱痛苦和挫折而进行的奋斗。</p>'),(85,'2025-04-23 06:58:54','你要去相信，没有到不了的明天','有梦想就去努力，因为在这一辈子里面，现在不去勇敢的努力，也许就再也没有机会了。你要去相信，一定要相信，没有到不了的明天。不要被命运打败，让自己变得更强大。不管你现在yes一个人走在异乡的街道上始终没有找到一丝归属感，还yes你在跟朋友们一起吃饭开心址笑着的时候闪过一丝落寞。','upload/news_picture5.jpg','<p>有梦想就去努力，因为在这一辈子里面，现在不去勇敢的努力，也许就再也没有机会了。你要去相信，一定要相信，没有到不了的明天。不要被命运打败，让自己变得更强大。</p><p>不管你现在yes一个人走在异乡的街道上始终没有找到一丝归属感，还yes你在跟朋友们一起吃饭开心址笑着的时候闪过一丝落寞。</p><p>	不管你现在yes在图书馆里背着怎么也看不进去的英语单词，还yes你现在迷茫地看不清未来的方向不知道要往哪走。</p><p>不管你现在yes在努力着去实现梦想却没能拉近与梦想的距离，还yes你已经慢慢地找不到自己的梦想了。</p><p>你都要去相信，没有到不了的明天。</p><p>	有的时候你的梦想太大，别人说你的梦想根本不可能实现;有的时候你的梦想又太小，又有人说你胸无大志;有的时候你对死党说着将来要去环游世界的梦想，却换来他的不屑一顾，于yes你再也不提自己的梦想;有的时候你突然说起将来要开个小店的愿望，却发现你讲述的那个人，并没有听到你在说什么。</p><p>不过又能怎么样呢，未来始终yes自己的，梦想始终yes自己的，没有人会来帮你实现它。</p><p>也许很多时候我们只yes需要朋友的一句鼓励，一句安慰，却也得不到。但yes相信我，世界上还有很多人，只yes想要和你说说话。</p><p>因为我们都一样。一样的被人说成固执，一样的在追逐他们眼里根本不在意的东西。</p><p>所以，又有什么关系呢，别人始终不yes你、不能懂你的心情，你又何必多去解释呢。这个世界会来阻止你，困难也会接踵而至，其实真正关键的只有自己，有没有那个倔强。</p><p>这个世界上没有不带伤的人，真正能治愈自己的，只有自己。</p>'),(86,'2025-04-23 06:58:54','离开yes一种痛苦，yes一种勇气，但同样也yes一个考验，yes一个新的开端','无穷无尽yes离愁，天涯海角遍寻思。当离别在即之时，当面对着相濡以沫兄弟般的朋友时，当面对着经历了四年的磨合而形成的真挚友谊之时，我内心激动无语，说一声再见，道一声珍重都很难出口。回想自己四年大学的风风雨雨，回想我们曾经共同经历的岁月流年，我感谢大家的相扶相依，感谢朋友们的莫大支持与帮助。虽然舍不得，但离别的脚步却不因我们的挚情而停滞。','upload/news_picture6.jpg','<p>无穷无尽yes离愁，天涯海角遍寻思。当离别在即之时，当面对着相濡以沫兄弟般的朋友时，当面对着经历了四年的磨合而形成的真挚友谊之时，我内心激动无语，说一声再见，道一声珍重都很难出口。回想自己四年大学的风风雨雨，回想我们曾经共同经历的岁月流年，我感谢大家的相扶相依，感谢朋友们的莫大支持与帮助。虽然舍不得，但离别的脚步却不因我们的挚情而停滞。离别的确yes一种痛苦，但同样也yes我们走入社会，走向新环境、新领域的一个开端，希望大家在以后新的工作岗位上能够Sure自己的新起点，坚持不懈，向着更新、更高的目标前进，因为人生最美好的东西永远都在最前方!</p><p>忆往昔峥嵘岁月，看今朝潮起潮落，望未来任重而道远。作为新时代的我们，就应在 Failure时，能拼搏奋起，去谱写人生的辉煌。在 Success时，亦能居安思危，不沉湎于一时的荣耀、鲜花和掌声中，时时刻刻怀着一颗积极寻找自己新的奶酪的心，处变不惊、成败不渝，始终踏着自己坚实的步伐，从零开始，不断向前迈进，这样才能在这风起云涌、变幻莫测的社会大潮中成为真正的弄潮儿!</p>'),(87,'2025-04-23 06:58:54','Leave未必yes一种痛苦','无穷无尽yes离愁，天涯海角遍寻思。当离别在即之时，当面对着相濡以沫兄弟般的朋友时，当面对着经历了四年的磨合而形成的真挚友谊之时，我内心激动无语，说一声再见，道一声珍重都很难出口。回想自己四年大学的风风雨雨，回想我们曾经共同经历的岁月流年，我感谢大家的相扶相依，感谢朋友们的莫大支持与帮助。虽然舍不得，但离别的脚步却不因我们的挚情而停滞。','upload/news_picture7.jpg','<p>无穷无尽yes离愁，天涯海角遍寻思。当离别在即之时，当面对着相濡以沫兄弟般的朋友时，当面对着经历了四年的磨合而形成的真挚友谊之时，我内心激动无语，说一声再见，道一声珍重都很难出口。回想自己四年大学的风风雨雨，回想我们曾经共同经历的岁月流年，我感谢大家的相扶相依，感谢朋友们的莫大支持与帮助。虽然舍不得，但离别的脚步却不因我们的挚情而停滞。离别的确yes一种痛苦，但同样也yes我们走入社会，走向新环境、新领域的一个开端，希望大家在以后新的工作岗位上能够Sure自己的新起点，坚持不懈，向着更新、更高的目标前进，因为人生最美好的东西永远都在最前方!</p><p>忆往昔峥嵘岁月，看今朝潮起潮落，望未来任重而道远。作为新时代的我们，就应在 Failure时，能拼搏奋起，去谱写人生的辉煌。在 Success时，亦能居安思危，不沉湎于一时的荣耀、鲜花和掌声中，时时刻刻怀着一颗积极寻找自己新的奶酪的心，处变不惊、成败不渝，始终踏着自己坚实的步伐，从零开始，不断向前迈进，这样才能在这风起云涌、变幻莫测的社会大潮中成为真正的弄潮儿!</p>'),(88,'2025-04-23 06:58:54','坚持才会 Success','回头看看，你会不会发现，曾经的你在这里摔倒过;回头看看，你yesno发现，一次次地重复着，却从没爬起过。而如今，让我们把视线转向前方，那一道道金色的弧线，yes流星飞逝的痕迹，或yes Success运行的轨道。今天的你，yesno要扬帆起航，让幸福来敲门?清晨的太阳撒向大地，神奇的宇宙赋予它神奇的色彩，大自然沐浴着春光，世界因太阳的照射而精彩，林中百鸟啾啾，河水轻轻流淌，汇成清宁的山间小调。','upload/news_picture8.jpg','<p>回头看看，你会不会发现，曾经的你在这里摔倒过;回头看看，你yesno发现，一次次地重复着，却从没爬起过。而如今，让我们把视线转向前方，那一道道金色的弧线，yes流星飞逝的痕迹，或yes Success运行的轨道。今天的你，yesno要扬帆起航，让幸福来敲门?</p><p>清晨的太阳撒向大地，神奇的宇宙赋予它神奇的色彩，大自然沐浴着春光，世界因太阳的照射而精彩，林中百鸟啾啾，河水轻轻流淌，汇成清宁的山间小调。</p><p>yes的，面对道途上那无情的嘲讽，面对步伐中那重复的摔跤，面对激流与硬石之间猛烈的碰撞，我们必须Choose那富于阴雨，却最终见到彩虹的荆棘路。也许，经历了那暴风雨的洗礼，我们便会变得自信，幸福也随之而来。</p><p>司马迁屡遭羞辱，却依然在狱中撰写《史记》，作为一名史学家，不因王权而极度赞赏，也不因卑微而极度批判，然而他在坚持自己操守的同时，却依然要受统治阶级的阻碍，他似乎无权Choose自己的本职。但yes，他不顾于此，只yes在面对道途的阻隔之时，他依然Choose了走下去的信念。终于一部开山巨作《史记》诞生，为后人留下一份馈赠，也许在他完成毕生的杰作之时，他微微地笑了，没有什么比梦想实现更快乐的了......</p><p>	或许正如“长风破浪会有时，直挂云帆济沧海”一般，欣欣然地走向看似深渊的崎岖路，而在一番耕耘之后，便会发现这里另有一番天地。也许这就yes困难与快乐的交融。</p><p>也许在形形色色的社会中，我们常能看到一份坚持，一份自信，但这里却还有一类人。这类人在暴风雨来临之际，只会闪躲，从未懂得这也yes一种历炼，这何尝不yes一份快乐。在阴暗的角落里，总yes独自在哭，带着伤愁，看不到一点希望。</p><p>我们不能堕落于此，而要像海燕那般，在苍茫的大海上，高傲地飞翔，任何事物都无法阻挡，任何事都yes幸福快乐的。</p>'),(89,'2025-04-23 07:06:40','商城公告','输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent','upload/企业 (3)-1681369586832.jpeg','<p>入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent输入公告信息more informationContent</p>');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `orderid` varchar(200) NOT NULL COMMENT 'Order ID',
  `tablename` varchar(200) DEFAULT 'shangpinxinxi' COMMENT 'Commodity表名',
  `userid` bigint(20) NOT NULL COMMENT 'userid',
  `goodid` bigint(20) NOT NULL COMMENT 'Commodityid',
  `goodname` varchar(200) DEFAULT NULL COMMENT 'Product name',
  `picture` longtext COMMENT 'Commodity Picture',
  `buynumber` int(11) NOT NULL COMMENT 'BuyAmount',
  `price` float NOT NULL DEFAULT '0' COMMENT 'Price',
  `discountprice` float DEFAULT '0' COMMENT 'Discount Price',
  `total` float NOT NULL DEFAULT '0' COMMENT 'Total Price',
  `discounttotal` float DEFAULT '0' COMMENT 'Total discount Price',
  `type` int(11) DEFAULT '1' COMMENT 'Payment type',
  `status` varchar(200) DEFAULT NULL COMMENT 'Status',
  `address` varchar(200) DEFAULT NULL COMMENT 'address',
  `tel` varchar(200) DEFAULT NULL COMMENT 'Phone Number',
  `consignee` varchar(200) DEFAULT NULL COMMENT 'Consignee',
  `remark` varchar(200) DEFAULT NULL COMMENT 'Remarks',
  `logistics` longtext COMMENT '物流',
  `goodtype` varchar(200) DEFAULT NULL COMMENT 'Commodity类型',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderid` (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Order';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-04-23 07:07:16','202341315731591','shangpinxinxi',19,39,'面霜','upload/护肤品 (2)-1681369548573.jpeg',1,36,36,36,36,1,'Completed','北京路9号','13823888885','王强','','<p>发货后输入物流信息</p>','护肤品');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shangpinfenlei`
--

DROP TABLE IF EXISTS `shangpinfenlei`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shangpinfenlei` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `shangpinfenlei` varchar(200) DEFAULT NULL COMMENT 'Commodity classification',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='Commodity classification';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shangpinfenlei`
--

LOCK TABLES `shangpinfenlei` WRITE;
/*!40000 ALTER TABLE `shangpinfenlei` DISABLE KEYS */;
INSERT INTO `shangpinfenlei` VALUES (21,'2025-04-23 06:58:54','Commodity classification1'),(22,'2025-04-23 06:58:54','Commodity classification2'),(23,'2025-04-23 06:58:54','Commodity classification3'),(24,'2025-04-23 06:58:54','Commodity classification4'),(25,'2025-04-23 06:58:54','Commodity classification5'),(26,'2025-04-23 06:58:54','Commodity classification6'),(27,'2025-04-23 06:58:54','Commodity classification7'),(28,'2025-04-23 06:58:54','电子产品'),(29,'2025-04-23 07:05:29','护肤品');
/*!40000 ALTER TABLE `shangpinfenlei` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shangpinxinxi`
--

DROP TABLE IF EXISTS `shangpinxinxi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shangpinxinxi` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `shangpinmingcheng` varchar(200) DEFAULT NULL COMMENT 'Product name',
  `tupian` longtext COMMENT 'Picture',
  `shangpinfenlei` varchar(200) DEFAULT NULL COMMENT 'Commodity classification',
  `guige` varchar(200) DEFAULT NULL COMMENT 'Specification',
  `pinpai` varchar(200) DEFAULT NULL COMMENT 'Brand',
  `shangpinxiangqing` longtext COMMENT 'Commoditymore',
  `clicktime` datetime DEFAULT NULL COMMENT '最近点击时间',
  `clicknum` int(11) DEFAULT '0' COMMENT 'Number of clicks',
  `price` float NOT NULL COMMENT 'Price',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='Commodity information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shangpinxinxi`
--

LOCK TABLES `shangpinxinxi` WRITE;
/*!40000 ALTER TABLE `shangpinxinxi` DISABLE KEYS */;
INSERT INTO `shangpinxinxi` VALUES (31,'2025-04-23 06:58:54','Product name1','upload/shangpinxinxi_tupian1.jpg,upload/shangpinxinxi_tupian2.jpg,upload/shangpinxinxi_tupian3.jpg','Commodity classification1','Specification1','Brand1','Commoditymore1','2025-04-23 14:58:54',1,99.9),(32,'2025-04-23 06:58:54','Product name2','upload/shangpinxinxi_tupian2.jpg,upload/shangpinxinxi_tupian3.jpg,upload/shangpinxinxi_tupian4.jpg','Commodity classification2','Specification2','Brand2','Commoditymore2','2025-04-23 07:03:36',3,99.9),(33,'2025-04-23 06:58:54','Product name3','upload/shangpinxinxi_tupian3.jpg,upload/shangpinxinxi_tupian4.jpg,upload/shangpinxinxi_tupian5.jpg','Commodity classification3','Specification3','Brand3','Commoditymore3','2025-04-23 14:58:54',3,99.9),(34,'2025-04-23 06:58:54','Product name4','upload/shangpinxinxi_tupian4.jpg,upload/shangpinxinxi_tupian5.jpg,upload/shangpinxinxi_tupian6.jpg','Commodity classification4','Specification4','Brand4','Commoditymore4','2025-04-23 14:58:54',4,99.9),(35,'2025-04-23 06:58:54','Product name5','upload/shangpinxinxi_tupian5.jpg,upload/shangpinxinxi_tupian6.jpg,upload/shangpinxinxi_tupian7.jpg','Commodity classification5','Specification5','Brand5','Commoditymore5','2025-04-23 14:58:54',5,99.9),(36,'2025-04-23 06:58:54','Product name6','upload/shangpinxinxi_tupian6.jpg,upload/shangpinxinxi_tupian7.jpg,upload/shangpinxinxi_tupian8.jpg','Commodity classification6','Specification6','Brand6','Commoditymore6','2025-04-23 14:58:54',6,99.9),(37,'2025-04-23 06:58:54','Product name7','upload/shangpinxinxi_tupian7.jpg,upload/shangpinxinxi_tupian8.jpg,upload/shangpinxinxi_tupian9.jpg','Commodity classification7','Specification7','Brand7','Commoditymore7','2025-04-23 14:58:54',7,99.9),(38,'2025-04-23 06:58:54','Product name8','upload/shangpinxinxi_tupian8.jpg,upload/shangpinxinxi_tupian9.jpg,upload/shangpinxinxi_tupian10.jpg','Commodity classification8','Specification8','Brand8','Commoditymore8','2025-04-23 14:58:54',8,99.9),(39,'2025-04-23 07:06:08','面霜','upload/护肤品 (2)-1681369548573.jpeg','护肤品','150g','大宝','<p>输入Commoditymore informationContent</p><p><img src=\"http://localhost:8080/database/upload/护肤品 (2)-1681369566888.jpeg\"></p>','2025-04-23 07:08:12',6,36);
/*!40000 ALTER TABLE `shangpinxinxi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeup`
--

DROP TABLE IF EXISTS `storeup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `userid` bigint(20) NOT NULL COMMENT 'userid',
  `refid` bigint(20) DEFAULT NULL COMMENT 'Commodityid',
  `tablename` varchar(200) DEFAULT NULL COMMENT '表名',
  `name` varchar(200) NOT NULL COMMENT 'Name',
  `picture` longtext NOT NULL COMMENT 'Picture',
  `type` varchar(200) DEFAULT '1' COMMENT '类型(1: collect ,21:赞,22:踩,31:竞拍参与,41:关注)',
  `inteltype` varchar(200) DEFAULT NULL COMMENT ' Recommend类型',
  `remark` varchar(200) DEFAULT NULL COMMENT 'Remarks',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT=' collect 表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeup`
--

LOCK TABLES `storeup` WRITE;
/*!40000 ALTER TABLE `storeup` DISABLE KEYS */;
INSERT INTO `storeup` VALUES (1,'2025-04-23 07:06:58',19,39,'shangpinxinxi','面霜','upload/护肤品 (2)-1681369548573.jpeg','1','护肤品','');
/*!40000 ALTER TABLE `storeup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(100) NOT NULL COMMENT 'User',
  `password` varchar(100) NOT NULL COMMENT 'Password',
  `role` varchar(100) DEFAULT '管理员' COMMENT '角色',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'add时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='user表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','管理员','2025-04-23 06:58:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yonghu`
--

DROP TABLE IF EXISTS `yonghu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `yonghu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `yonghuzhanghao` varchar(200) NOT NULL COMMENT 'userAccount',
  `mima` varchar(200) NOT NULL COMMENT 'Password',
  `yonghuxingming` varchar(200) DEFAULT NULL COMMENT 'userName',
  `touxiang` longtext COMMENT 'Profile picture',
  `xingbie` varchar(200) DEFAULT NULL COMMENT 'Gender',
  `shoujihaoma` varchar(200) DEFAULT NULL COMMENT 'Mobile phone number',
  `money` float DEFAULT '0' COMMENT 'Balance',
  PRIMARY KEY (`id`),
  UNIQUE KEY `yonghuzhanghao` (`yonghuzhanghao`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='user';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yonghu`
--

LOCK TABLES `yonghu` WRITE;
/*!40000 ALTER TABLE `yonghu` DISABLE KEYS */;
INSERT INTO `yonghu` VALUES (11,'2025-04-23 06:58:54','userAccount1','e10adc3949ba59abbe56e057f20f883e','userName1','upload/yonghu_touxiang1.jpg','Male','13823888881',200),(12,'2025-04-23 06:58:54','userAccount2','e10adc3949ba59abbe56e057f20f883e','userName2','upload/yonghu_touxiang2.jpg','Male','13823888882',200),(13,'2025-04-23 06:58:54','userAccount3','e10adc3949ba59abbe56e057f20f883e','userName3','upload/yonghu_touxiang3.jpg','Male','13823888883',200),(14,'2025-04-23 06:58:54','userAccount4','e10adc3949ba59abbe56e057f20f883e','userName4','upload/yonghu_touxiang4.jpg','Male','13823888884',200),(15,'2025-04-23 06:58:54','userAccount5','e10adc3949ba59abbe56e057f20f883e','userName5','upload/yonghu_touxiang5.jpg','Male','13823888885',200),(16,'2025-04-23 06:58:54','userAccount6','e10adc3949ba59abbe56e057f20f883e','userName6','upload/yonghu_touxiang6.jpg','Male','13823888886',200),(17,'2025-04-23 06:58:54','userAccount7','e10adc3949ba59abbe56e057f20f883e','userName7','upload/yonghu_touxiang7.jpg','Male','13823888887',200),(18,'2025-04-23 06:58:54','userAccount8','e10adc3949ba59abbe56e057f20f883e','userName8','upload/yonghu_touxiang8.jpg','Male','13823888888',200),(19,'2025-04-23 07:04:23','001','dc5c7986daef50c1e02ab09b442ee34f','王强','upload/b5f006f3bb051ed2046f5b4a78a00843-1681369457766.jpeg','Male','13823877774',464);
/*!40000 ALTER TABLE `yonghu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-21 22:21:13
