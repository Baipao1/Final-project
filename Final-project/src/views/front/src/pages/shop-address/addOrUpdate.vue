<template>
<div :style='{"padding":"20px 20px 40px","margin":"10px auto 0","borderColor":"#52b646","borderRadius":"12px","background":"#fff","borderWidth":"3px","width":"1200px","position":"relative","borderStyle":"solid dashed double double"}'>
    <el-form class="add-update-preview" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="Contact person" prop="name">
        <el-input v-model="form.name" placeholder="Contact person"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="Mobile phone number" prop="phone">
        <el-input v-model="form.phone" placeholder="Mobile phone number"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="Default">
        <el-radio-group v-model="form.isdefault">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="address" prop="address">
        <el-input v-model="form.address" placeholder="Please enter address"></el-input>
      </el-form-item>
      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"radial-gradient(circle, rgba(132,218,110,1) 0%, rgba(63,187,33,1) 81%, rgba(82,182,70,1) 100%)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onSubmit('form')">Add</el-button>
        <el-button :style='{"border":"1px solid #52b646","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#52b646","borderRadius":"4px","background":"#ecfaea","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="goBack">Cancel</el-button>
      </el-form-item>
    </el-form>

    <el-dialog id="myMapDialog" title="PleaseSelect the deliveryaddress" width="500px" :visible.sync="dialogVisible" top="5vh">
      <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="onBaiduMapReady" @click="getClickInfo">
        <bm-view style="width: 100%; height: 100%;" />
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
      <div slot="footer">
        <el-input v-model="address" style="margin-bottom: 15px;" placeholder="PleaseChoose或填写收货address"></el-input>
        <el-button type="primary" @click="getAddr">Sure</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
  import { Loading } from 'element-ui';
  export default {
    //数据集合
    data() {
      return {
        form: {
          userid: localStorage.getItem('userid'),
          name: localStorage.getItem('username'),
          phone: '',
          isdefault: 'yes',
          address: ''
        },
        rules: {
          name: [{ required: true, message: 'Please enter Contact person', trigger: 'blur' }],
          phone: [
            { required: true, message: 'Please enter Mobile phone number', trigger: 'blur' },
            { required: true, validator: this.$validate.isMobile, trigger: 'blur' }
          ],
          address: [{ required: true, message: 'PleaseSelect the deliveryaddress', trigger: 'blur' }]
        },
        dialogVisible: false,
        BMap: null, // 地图组件yesno就绪
        // center: { lat: 24.30457061, lng: 116.12640310 },
        center: { lng: 0, lat: 0 },
        address: '',
        zoom: 15,
        loadingInstance: null,
        isEdit: false
      }
    },
    created() {
      if (this.$route.query.id != undefined) {
        this.isEdit = true;
        this.form = Object.assign({}, JSON.parse(this.$route.query.editObj));
      }
    },
    //方法集合
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(`address/${this.isEdit ? 'update' : 'add'}`, this.form).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: `${this.isEdit ? '更新' : 'Add'} Success`,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      getAddr() {
        if (this.address == '') {
          this.$message({
            message: 'address cannot be empty.',
            type: 'error',
            duration: 1500
          });
          return;
        }
        this.form.address = this.address;
        this.dialogVisible = false;
      },
      goBack() {
        this.$router.go(-1);
      },
      onBaiduMapReady(e) {
        let that = this
        this.BMap = e.BMap;
        if (this.BMap) {
          const geolocation = new this.BMap.Geolocation();
          geolocation.getCurrentPosition(res => {
            that.$nextTick(() => {
              that.loadingInstance.close();
            });
            that.center.lng = res.point.lng
            that.center.lat = res.point.lat
            const { province, city, district, street, street_number } = res.address;
            that.address = province + city + district + street + street_number;
          })
        }
      },
      getClickInfo(e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat

        if (this.BMap) {
          let that = this
          const geoCoder = new this.BMap.Geocoder()
          geoCoder.getLocation(e.point, function(res) {
            const addrComponent = res.addressComponents
            const surroundingPois = res.surroundingPois
            const province = addrComponent.province
            const city = addrComponent.city
            const district = addrComponent.district
            let addr = addrComponent.street
            if (surroundingPois.length > 0 && surroundingPois[0].title) {
              if (addr) {
                addr += `-${surroundingPois[0].title}`
              } else {
                addr += `${surroundingPois[0].title}`
              }
            } else {
              addr += addrComponent.streetNumber
            }
            that.address = province + city + district + addr;
          })
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #666;
	  	  font-weight: 500;
	  	  width: 80px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
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
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 1px solid #88d67e;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: inset 0px 0px 48px 0px #def5db;
	  	  outline: none;
	  	  color: #666;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
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
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  border: 1px solid #88d67e;
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
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px solid #88d67e;
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
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px solid #88d67e;
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
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 1px solid #88d67e;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: inset 0px 0px 48px 0px #def5db;
	  	  outline: none;
	  	  color: #666;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
    .map{
        height: 50vh;
    }
</style>
