<template>
	<div>
		<div class="container" :style='{"minHeight":"100vh","backgroundAttachment":"fixed","alignItems":"center","background":"url(http://codegen.caihongy.cn/20220722/a5a9809d7bce4ca795483bb67cfd60c8.png)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"repeat","justifyContent":"center"}'>
			<el-form v-if="pageFlag=='register'" :style='{"padding":"20px","boxShadow":"0 0px 0px rgba(64, 158, 255, .8)","margin":"0 0 0 660px","borderRadius":"0","background":"transparent","width":"calc(100vw - 660px)","height":"auto"}' ref="rgsForm" class="rgs-form" :model="rgsForm">
				<div v-if="true" :style='{"margin":"0 0 10px 0","color":"#000","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"24px","textShadow":"4px 4px 2px rgba(0, 0, 0, .2)"}' class="title">Taomao Online MallRegister</div>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">userAccount</div>
					<el-input  v-model="ruleForm.yonghuzhanghao"  autocomplete="off" placeholder="userAccount"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">Password</div>
					<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="Password"  type="password"  />
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">Make sure Password</div>
					<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="Make sure Password" type="password" />
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">userName</div>
					<el-input  v-model="ruleForm.yonghuxingming"  autocomplete="off" placeholder="userName"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">Profile picture</div>
                    <file-upload
                        tip="Click to upload Profile picture"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
                        @change="yonghutouxiangUploadChange"
                    ></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">Gender</div>
                    <el-select v-model="ruleForm.xingbie" placeholder="PleaseChooseGender" >
                        <el-option
                            v-for="(item,index) in yonghuxingbieOptions"
                            v-bind:key="index"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item :style='{"width":"500px","padding":"0","margin":"0 auto 15px","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='yonghu'">
					<div v-if="true" :style='{"color":"#31ae88","left":"-160px","textAlign":"right","background":"none","width":"150px","lineHeight":"44px","fontSize":"14px","position":"absolute"}' class="lable">Mobile phone number</div>
					<el-input  v-model="ruleForm.shoujihaoma"  autocomplete="off" placeholder="Mobile phone number"  type="text"  />
				</el-form-item>
				<button :style='{"border":"0","cursor":"pointer","padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .5)","margin":"20px auto 5px","color":"#fff","display":"block","outline":"none","borderRadius":"5px","background":"#67D4B2","width":"30%","fontSize":"16px","height":"44px"}' type="button" class="r-btn" @click="login()">Register</button>
				<div :style='{"cursor":"pointer","color":"rgba(159, 159, 159, 1)","textAlign":"center","display":"inline-block","width":"100%","lineHeight":"1","fontSize":"12px","textDecoration":"underline"}' class="r-login" @click="close()">已有Account，直接 login</div>
			</el-form>
			
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			ruleForm: {
                xingbie: '',
			},

            pageFlag : '',
			tableName:"",
			rules: {},
            yonghuxingbieOptions: [],
		};
	},
	mounted(){
        this.pageFlag = this.$storage.get("pageFlag");
		let table = this.$storage.get("loginTable");
		this.tableName = table;
        this.yonghuxingbieOptions = "Male,Female".split(',')
	},
	created() {
    
	},
	destroyed() {
		  	},
	methods: {
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		close(){
			this.$router.push({ path: "/login" });
		},
        yonghutouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },

        // 多级联动参数


		// Register
		login() {
			var url=this.tableName+"/register";
					if((!this.ruleForm.yonghuzhanghao) && `yonghu` == this.tableName){
						this.$message.error(`userAccount cannot be empty.`);
						return
					}
					
					
					
					
					
					
					
					
					
					
					if((!this.ruleForm.mima) && `yonghu` == this.tableName){
						this.$message.error(`Password cannot be empty.`);
						return
					}
					
					
					
					
					
					
					
					
					
					
					if((this.ruleForm.mima!=this.ruleForm.mima2) && `yonghu` == this.tableName){
						this.$message.error(`两次Password输入不一致`);
						return
					}
					
					
					
					
					
					
					
					
					
					
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					if(`yonghu` == this.tableName && this.ruleForm.shoujihaoma&&(!this.$validate.isMobile(this.ruleForm.shoujihaoma))){
						this.$message.error(`Mobile phone number应输入手机格式`);
						return
					}
					
					
					
					
					
					
					
					
					if(`yonghu` == this.tableName && this.ruleForm.money&&(!this.$validate.isNumber(this.ruleForm.money))){
						this.$message.error(`Balance应输入数字`);
						return
					}
					
					
					
					
					
					
				
			
			this.$http({
				url: url,
				method: "post",
				data:this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "Register Success",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.$router.replace({ path: "/login" });
						}
					});
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.container {
	  position: relative;
	  background: url(http://codegen.caihongy.cn/20220722/a5a9809d7bce4ca795483bb67cfd60c8.png);

		.el-date-editor.el-input {
		  width: 100%;
		}
		
		.rgs-form .el-input /deep/ .el-input__inner {
						border: 1px solid #67D4B2;
						border-radius: 0;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-select /deep/ .el-input__inner {
						border: 1px solid #67D4B2;
						border-radius: 0;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 500px;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 1px solid #67D4B2;
						border-radius: 0;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 1px solid #67D4B2;
						border-radius: 0;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 44px;
					}
		
		.rgs-form /deep/ .el-upload--picture-card {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: auto;
			height: auto;
			line-height: initial;
			vertical-align: middle;
		}
		
		.rgs-form /deep/ .upload .upload-img {
		  		  border: 1px dashed #67D4B2;
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #67D4B2;
		  		  width: 100px;
		  		  font-size: 32px;
		  		  line-height: 100px;
		  		  text-align: center;
		  		  height: 100px;
		  		}
		
		.rgs-form /deep/ .el-upload-list .el-upload-list__item {
		  		  border: 1px dashed #67D4B2;
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #67D4B2;
		  		  width: 100px;
		  		  font-size: 32px;
		  		  line-height: 100px;
		  		  text-align: center;
		  		  height: 100px;
		  		}
		
		.rgs-form /deep/ .el-upload .el-icon-plus {
		  		  border: 1px dashed #67D4B2;
		  		  cursor: pointer;
		  		  border-radius: 8px;
		  		  color: #67D4B2;
		  		  width: 100px;
		  		  font-size: 32px;
		  		  line-height: 100px;
		  		  text-align: center;
		  		  height: 100px;
		  		}
	}
</style>
