<template>
<div class="center-preview" :style='{"width":"1200px","margin":"10px auto","position":"relative","background":"none"}'>
	<div class="title" :style='{"padding":"16px 0","margin":"20px 0","borderColor":"#52b646","color":"#52b646","borderRadius":"8px","textAlign":"center","background":"#eff9ee","borderWidth":"4px","fontSize":"24px","lineHeight":"1.5","borderStyle":"dashed dotted solid double"}'>{{ title }}</div>

    <el-tabs tab-position="left" :style='{"boxShadow":"0 2px 4px rgba(0,0,0,.1)","padding":"12px 0 0","margin":"20px 0 40px","borderColor":"#52b646","borderRadius":"8px","background":"#f5f5f5","borderWidth":"4px","borderStyle":"dashed dotted solid double"}' @tab-click="handleClick">
      <el-tab-pane label="Personal Center">
        <el-form class="center-preview-pv" ref="sessionForm" :model="sessionForm" :rules="rules" label-width="80px">
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="userAccount" prop="yonghuzhanghao">
            <el-input v-model="sessionForm.yonghuzhanghao" placeholder="userAccount" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="Password" prop="mima">
            <el-input type="password" v-model="sessionForm.mima" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="userName" prop="yonghuxingming">
            <el-input v-model="sessionForm.yonghuxingming" placeholder="userName" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="Profile picture">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="yonghutouxiangHandleAvatarSuccess">
              <img :style='{"border":"1px dashed #88d67e","cursor":"pointer","boxShadow":"inset 0px 0px 48px 0px #def5db","color":"#88d67e","borderRadius":"6px","textAlign":"center","width":"200px","fontSize":"32px","lineHeight":"120px","height":"auto"}' v-if="sessionForm.touxiang" :src="baseUrl + sessionForm.touxiang" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="Gender">
            <el-select v-model="sessionForm.xingbie" placeholder="PleaseChooseGender" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="Mobile phone number" prop="shoujihaoma">
            <el-input v-model="sessionForm.shoujihaoma" placeholder="Mobile phone number" ></el-input>
          </el-form-item>
          <el-form-item class="balance" :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='yonghu'" label="Balance">
            <div :style='{"flexWrap":"wrap","display":"flex"}'>
				<el-input v-model="sessionForm.money" placeholder="Balance" readonly></el-input>
				<div @click="dialogFormVisibleMoney = true" :style='{"border":"0","cursor":"pointer","padding":"0 15px","margin":"0 20px 0 0","color":"rgba(255, 255, 255, 1)","display":"inline-block","outline":"none","borderRadius":"4px","background":"radial-gradient(circle, rgba(132,218,110,1) 0%, rgba(63,187,33,1) 81%, rgba(82,182,70,1) 100%)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}'>Recharge</div>
			</div>
		  </el-form-item>
          <el-form-item :style='{"padding":"0","margin":"0"}'>
            <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"radial-gradient(circle, rgba(132,218,110,1) 0%, rgba(63,187,33,1) 81%, rgba(82,182,70,1) 100%)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onSubmit('sessionForm')">Update information</el-button>
            <el-button :style='{"border":"1px solid #52b646","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#52b646","borderRadius":"4px","background":"#ecfaea","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="danger" @click="logout">logout</el-button>
          </el-form-item>
        </el-form>
		
        <el-dialog title="User recharge" :visible.sync="dialogFormVisibleMoney" width="726px" center>
          <el-form :model="chongzhiForm">
            <el-form-item label="Recharge amount" label-width="120px">
              <el-input type="number" v-model="chongzhiForm.money" autocomplete="off" placeholder="Recharge amount"></el-input>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-radio-group v-model="chongzhiForm.radio">
                <el-radio style="margin-bottom: 30px" label="Wechat Pay">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/weixin.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">Wechat Pay</span>
                </el-radio>
                <el-radio label="Alipay">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhifubao.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">Alipay</span>
                </el-radio>
                <el-radio label="中国建设银行Pay">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jianshe.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国农业银行Pay">
                  <el-image
                    style="width: 126px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/nongye.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国银行Pay">
                  <el-image
                    style="width: 140px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhongguo.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="交通银行Pay">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jiaotong.png')"
                    fit="fill"></el-image>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleMoney = false">取 消</el-button>
            <el-button type="primary" @click="chongzhi">Recharge</el-button>
          </div>
        </el-dialog>
        <el-dialog title="会员Buy" :visible.sync="dialogFormVisibleVip" width="726px" center>
          <el-form :model="chongzhiForm">
            <el-form-item label="会员卡" label-width="120px">
              <el-input readonly autocomplete="off" value="￥199/年"></el-input>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-radio-group v-model="chongzhiForm.radio">
                <el-radio style="margin-bottom: 30px" label="Wechat Pay">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/weixin.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">Wechat Pay</span>
                </el-radio>
                <el-radio label="Alipay">
                  <el-image
                    style="width: 60px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhifubao.png')"
                    fit="fill"></el-image>
                    <span style="display: inline-block;margin-left: 10px">Alipay</span>
                </el-radio>
                <el-radio label="中国建设银行Pay">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jianshe.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国农业银行Pay">
                  <el-image
                    style="width: 126px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/nongye.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="中国银行Pay">
                  <el-image
                    style="width: 140px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/zhongguo.png')"
                    fit="fill"></el-image>
                </el-radio>
                <el-radio label="交通银行Pay">
                  <el-image
                    style="width: 120px; height: 60px;vertical-align: middle;"
                    :src="require('@/assets/jiaotong.png')"
                    fit="fill"></el-image>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleVip = false">取 消</el-button>
            <el-button type="primary" @click="chongzhivip">确认Pay</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="My order"></el-tab-pane>
      <el-tab-pane label="My address" name="MyAddress">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="My collection"></el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
  import config from '@/config/config'
  import Vue from 'vue'
  export default {
    //数据集合
    data() {
      return {
        title: 'Personal Center',
        baseUrl: config.baseUrl,
        sessionForm: {},
        rules: {},
        chongzhiForm: {
          money: '',
          radio: ''
        },
        disabled: false,
        dialogFormVisibleMoney: false,
        dialogFormVisibleVip: false,
        uploadUrl: config.baseUrl + 'file/upload',
        imageUrl: '',
        headers: {Token: localStorage.getItem('Token')},
        userTableName: localStorage.getItem('UserTableName'),
        dynamicProp: {}
      }
    },
    created() {
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'yonghuzhanghao', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'mima', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'yonghuxingming', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'touxiang', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'xingbie', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'shoujihaoma', null);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.sessionForm, 'money', null);
      }

      if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'yonghuzhanghao', [{ required: true, message: 'Please enter userAccount', trigger: 'blur' }]);
      }
      if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: 'Please enter Password', trigger: 'blur' }]);
      }
			if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'shoujihaoma', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
      }
			if ('yonghu' == this.userTableName) {
        this.$set(this.rules, 'money', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }

      this.init();
      this.getSession();
    },
    //方法集合
    methods: {
      init() {
        if ('yonghu' == this.userTableName) {
          this.dynamicProp.xingbie = 'Male,Female'.split(',');
        }
      },
      getSession() {
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.sessionForm = res.data.data;
            localStorage.setItem('userid', res.data.data.id);
            if(res.data.data.vip) {
                localStorage.setItem('vip', res.data.data.vip);
            }
            if(res.data.data.touxiang) {
                localStorage.setItem('headportrait', res.data.data.touxiang);
            } else if(res.data.data.headportrait) {
                localStorage.setItem('headportrait', res.data.data.headportrait);
            }
          }
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: '更新 Success',
                  type: 'success',
                  duration: 1500
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      yonghutouxiangHandleAvatarSuccess(res, file) {
        if (res.code == 0) {
          if ('yonghu' == this.userTableName) {
            this.sessionForm.touxiang = 'upload/' + res.file;
          }
        }
      },
      chongzhi() {
        if (this.chongzhiForm.money == '') {
          this.$message({
            message: 'Please enter Recharge amount',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if (this.chongzhiForm.money <= 0) {
          this.$message({
            message: 'Please enter 正确的Recharge amount',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if (this.chongzhiForm.radio == '') {
          this.$message({
            message: 'PleaseChooseRecharge方式',
            type: 'error',
            duration: 1500
          });
          return;
        }
        this.sessionForm.money = parseInt(this.sessionForm.money) + parseInt(this.chongzhiForm.money);
        this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: 'Recharge Success',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.dialogFormVisibleMoney = false;
              }
            });
          }
        });
      },
      chongzhivip() {
        this.chongzhiForm.money == 199;
        if (this.chongzhiForm.radio == '') {
          this.$message({
            message: 'PleaseChoosePay方式',
            type: 'error',
            duration: 1500
          });
          return;
        }
        if(this.sessionForm.vip == 'yes') {
          this.$message({
            message: '您已yes我们的尊贵会员。',
            type: 'success',
            duration: 1500
          });
          return;
        }
        
        this.sessionForm.vip = "yes"
        this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: '会员Buy Success',
              type: 'success',
              duration: 1500,
              onClose: () => {
                localStorage.setItem('vip', this.sessionForm.vip);
                this.dialogFormVisibleVip = false;
              }
            });
          }
        });
      },
      handleClick(tab, event) {
        switch(event.target.outerText) {
          case 'Personal Center':
            tab.$router.push('/index/center');
            break;
          case 'My order':
            tab.$router.push('/index/shop-order/order');
            break;
          case 'My address':
            tab.$router.push('/index/shop-address/list');
            break;
          case 'My collection':
            localStorage.setItem('storeupType', 1);
            tab.$router.push('/index/storeup');
            break;
        }

        this.title = event.target.outerText;
      },
      logout() {
        localStorage.clear();
        Vue.http.headers.common['Token'] = "";
        this.$router.push('/index/home');
        this.activeIndex = '0'
        localStorage.setItem('keyPath', this.activeIndex)
        this.$forceUpdate()
        this.$message({
            message: '登出 Success',
            type: 'success',
            duration: 1500,
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .center-preview {
  
    .el-tabs {
      & /deep/ .el-tabs__header {
        .el-tabs__nav-wrap {
          margin: 0;
  
          &::after {
            content: none;
          }
        }
  
        .el-tabs__active-bar {
          display: none !important;
        }
      }
  
      .center-preview-pv {
        .el-date-editor.el-input {
          width: auto;
        }
  
        .balance {
          .el-input {
            width: auto;
          }
        }
      }
    }
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header {
	padding: 12px;
	margin: 0;
	background: #f5f5f5;
	width: 180px;
	border-color: #eee;
	border-width: 0 0px 0 0;
	position: relative;
	float: left;
	border-style: solid;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item {
  	border: 4px solid #f5f5f5;
  	padding: 0 10px;
  	color: #333;
  	background: #f5f5f5;
  	font-weight: 500;
  	font-size: 14px;
  	line-height: 36px;
  	position: relative;
  	text-align: center;
  	height: 44px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
  	padding: 0 10px;
  	color: #52b646;
  	background: #e6f5e5;
  	font-weight: 500;
  	font-size: 14px;
  	border-color: #52b646;
  	border-width: 4px;
  	line-height: 36px;
  	position: relative;
  	border-style: solid double solid double;
  	text-align: center;
  	height: 44px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
  	padding: 0 10px;
  	color: #52b646;
  	background: #e6f5e5;
  	font-weight: 500;
  	font-size: 14px;
  	border-color: #52b646;
  	border-width: 4px;
  	line-height: 36px;
  	position: relative;
  	border-style: solid double solid double;
  	text-align: center;
  	height: 44px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__content .el-tab-pane {
  	border-radius: 8px;
  	padding: 10px 10px 40px;
  	margin: 0 0 12px;
  	background: #fff;
  	width: calc(100% - 12px);
  }
  
  .center-preview-pv .el-form-item /deep/ .el-form-item__label {
  	padding: 0 10px 0 0;
  	color: #666;
  	font-weight: 500;
  	width: 80px;
  	font-size: 14px;
  	line-height: 40px;
  	text-align: right;
  }
  
  .center-preview-pv .el-form-item .el-form-item__content {
    margin-left: 80px;
  }
  
  .center-preview-pv .el-input /deep/ .el-input__inner {
  	border: 1px solid #88d67e;
  	border-radius: 4px;
  	padding: 0 12px;
  	box-shadow: inset 0px 0px 48px 0px #def5db;
  	outline: none;
  	color: #666;
  	width: 400px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-select /deep/ .el-input__inner {
  	border: 1px solid #88d67e;
  	border-radius: 4px;
  	padding: 0 12px;
  	box-shadow: inset 0px 0px 48px 0px #def5db;
  	outline: none;
  	color: #666;
  	width: 400px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-date-editor /deep/ .el-input__inner {
  	border: 1px solid #88d67e;
  	border-radius: 4px;
  	padding: 0 10px 0 30px;
  	box-shadow: inset 0px 0px 48px 0px #def5db;
  	outline: none;
  	color: #666;
  	width: 200px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv /deep/ .avatar-uploader-icon {
  	border: 1px dashed #88d67e;
  	cursor: pointer;
  	border-radius: 6px;
  	box-shadow: inset 0px 0px 48px 0px #def5db;
  	color: #88d67e;
  	width: 200px;
  	font-size: 32px;
  	line-height: 120px;
  	text-align: center;
  	height: auto;
  }
  
  .center-preview-pv .el-form-item.balance /deep/ .el-input__inner {
  	border: 1px solid #88d67e;
  	border-radius: 4px;
  	padding: 0 12px;
  	box-shadow: inset 0px 0px 48px 0px #def5db;
  	outline: none;
  	margin: 0 10px 0 0;
  	color: #666;
  	display: inline-block;
  	width: 200px;
  	font-size: 14px;
  	height: 40px;
  }
</style>
