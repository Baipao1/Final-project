<template>
  <div :style='{"padding":"20px 20px 40px","margin":"10px auto 0","borderColor":"#52b646","borderRadius":"12px","background":"#fff","borderWidth":"3px","width":"1200px","position":"relative","borderStyle":"solid dashed double double"}'>
    <div class="section-title" :style='{"padding":"16px 0","margin":"20px 0","borderColor":"#52b646","color":"#52b646","borderRadius":"8px","textAlign":"center","background":"#eff9ee","borderWidth":"4px","fontSize":"24px","lineHeight":"1.5","borderStyle":"dashed dotted solid double"}'>Confirm the order</div>
    <el-descriptions v-if="seat!=1" title="Select the deliveryaddress"></el-descriptions>
    <el-table v-if="seat!=1"
      :data="addressList"
      style="width: 100%;padding: 0 10px;">
      <el-table-column
        label="Choose"
        width="55">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            @change.native="getCurrentRow(scope.$index)">
            &nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        label="Recipient"
        prop="name">
      </el-table-column>
      <el-table-column
        label="Phone Number"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="address"
        prop="address">
      </el-table-column>
    </el-table>
    <el-descriptions title="List"></el-descriptions>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="Product name">
        <template slot-scope="scope">
          <div class="shangpin">
            <el-image
              style="width: 100px; height: 100px"
              :src="baseUrl + scope.row.picture"
              fit="fill"></el-image>
            <span style="margin-left: 10px">{{ scope.row.goodname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Price">
        <template slot-scope="scope">
          <span v-if="type == 2">{{ scope.row.price }} 积分</span>
          <span v-else><span :style='{"fontSize":"12px"}'>￥</span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="seat==1"
        label="座位">
        <template slot-scope="scope">
          <span>{{ scope.row.activeSeat }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="seat!=1"
        label="Amount">
        <template slot-scope="scope">
          <span>{{ scope.row.buynumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Total Prices">
        <template slot-scope="scope">
          <span v-if="type == 2">{{ scope.row.price * scope.row.buynumber }} 积分</span>
          <span v-else-if="seat==1"><span :style='{"fontSize":"12px"}'>￥</span>{{scope.row.total}}</span>
          <span v-else><span :style='{"fontSize":"12px"}'>￥</span>{{ (scope.row.price * scope.row.buynumber).toFixed(2) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;padding: 12px;box-sizing: border-box;display: flex;align-items: center;">
        <span style="width: 80px; font-size: 14px;">Remarks：</span><el-input type="textarea" v-model="remark" placeholder="Remarks" style="width: calc(100% - 80px);"></el-input>
    </div>
    <div class="buy" v-if="seat!=1 && tableData.length > 0">
      <template v-if="type == 2">
        <span style="color: red;margin-right: 10px;font-weight: 700;">Total Prices：{{totalPrice}} 积分</span>
        <el-button type="warning" @click="jfClick">兑换</el-button>
      </template>
      <template v-else>
        <span style="color: red;margin-right: 10px;font-weight: 700;">Total Prices：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
        <el-button type="success" @click="payClick">Pay</el-button>
      </template>
    </div>
    <div class="buy" v-if="seat==1 && tableData.length > 0">
      <template v-if="type == 2">
        <span style="color: red;margin-right: 10px;font-weight: 700;">Total Prices：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
        <el-button type="success" @click="xzJfClick">兑换</el-button>
      </template>
      <template v-else>
        <span style="color: red;margin-right: 10px;font-weight: 700;">Total Prices：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
        <el-button type="success" @click="xzPayClick">Pay</el-button>
      </template>
    </div>
  </div>
</template>

<script>
  import config from '@/config/config'
  export default {
    data() {
      return {
        baseUrl: config.baseUrl,
        userTableName: localStorage.getItem('UserTableName'),
        addressList: [],
        tableData: [],
        currentRow: null,
        radio: -1,
        order: {
          address: "",
          buynumber: 0,
          consignee: '',
          discountprice: 0,
          discounttotal: 0,
          goodid: 0,
          goodname: "",
          orderid: "",
          picture: "",
          price: 0,
          status: "Unpaid",
          tablename: "",
          tel: "",
          total: 0,
          type: 1,
          userid: localStorage.getItem('userid')
        },
        user: {},
        type: 0,
        seat: 0,
        buynumber: 0,
        remark:''
      }
    },
    created() {
      if(this.$route.query.type != undefined) {
        this.type = this.$route.query.type;
      }
      if(this.$route.query.seat != undefined) {
        this.seat = this.$route.query.seat;
      }
      if(this.$route.query.tablename != undefined) {
        this.order.tablename = this.$route.query.tablename;
      }

      this.getSession();
      this.getAddrList();
      // 获取CommodityBuy的List
      var orderGoods = localStorage.getItem('orderGoods')
      // 转换成json类型，localstorage保存的yesstring数据
      this.tableData = JSON.parse(orderGoods);
      this.type = this.$route.query.type;
    },
    methods: {
      getSession() {
        this.$http.get(`${this.userTableName}/session`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.user = res.data.data;
          }
        });
      },
      getCurrentRow(index) {
        this.radio = index;　
      },
      getAddrList() {
        this.$http.get('address/list', {params: {userid: localStorage.getItem('userid')}}).then(res => {
          if (res.data.code == 0) {
            this.addressList = res.data.data.list;
            this.addressList.forEach((item, index) => {
              if (item.isdefault == 'yes') {
                this.radio = index;
              }
            });
          }
        });
      },
      getCartList() {
        this.$http.get('cart/list', {params: {page: 1, limit: 1000, userid: localStorage.getItem('userid')}}).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.list;
            if (this.$route.query.id != undefined || this.$route.query.type != undefined) {
              this.tableData = [];
              this.buynumber = this.$route.query.buynumber;
              let detailObj = JSON.parse(this.$route.query.detailObj);
              this.order.tablename = this.$route.query.tablename;
              if (this.$route.query.type == 1) {
                this.tableData.push({
                  buynumber: this.buynumber,
                  goodid: detailObj.id,
                  picture: this.$route.query.picture,
                  goodname: this.$route.query.goodname,
                  goodtype: this.$route.query.goodtype,
                  tablename: this.$route.query.tablename,
                  userid: localStorage.getItem('userid'),
                  price: this.$route.query.price
                });
              }
              if (this.$route.query.type == 2) {
                this.tableData.push({
                  buynumber: this.buynumber,
                  goodid: detailObj.id,
                  picture: this.$route.query.picture,
                  goodname: this.$route.query.goodname,
                  tablename: this.$route.query.tablename,
                  userid: localStorage.getItem('userid'),
                  jf: detailObj.jf
                });
              }
            }
          }
        });
      },
      handleChange(value, index, goodid) {
        this.$http.get(`${this.order.tablename}/detail/${goodid}`).then(res => {
          if (res.data.code == 0 && value > res.data.data.onelimittimes) {
            this.tableData[index].buynumber = --value;
            this.$message.error(`每人单次只能Buy${res.data.data.onelimittimes}件`);
          }
        });
      },
        // 正常下单，生成Order，减少Balance，Add积分，减少库存，modification StatusPaid
        payClick() {
            if (this.radio == -1) {
              this.$message({
                message: 'PleaseSelect the deliveryaddress',
                type: 'error',
                duration: 1500
              });
              return;
            }

            // 生成Order
            this.tableData.forEach(item => {
                // 获取Commoditymore information
                this.$http.get(`${item.tablename}/info/${item.goodid}`).then(res => {
                    // Order ID
                    var orderId = this.createOrder();
                    let data = res.data.data;
                    data.alllimittimes = data.alllimittimes - item.buynumber;
                    // 更新库存信息
                    this.$http.post(`${item.tablename}/update`, data).then(res => {
                        // AddOrder信息
                        let order = {
                            orderid: orderId,
                            tablename: item.tablename,
                            userid: this.user.id,
                            goodid: item.goodid,
                            goodname: item.goodname,
                            goodtype: item.goodtype,
                            picture: item.picture,
                            buynumber: item.buynumber,
                            discountprice: item.price,
                            price: item.price,
                            total: item.price * item.buynumber,
                            discounttotal: item.price * item.buynumber,
                            type: this.type?this.type:1,
                            //total: this.totalPrice,
                            address: this.addressList[this.radio].address,
                            tel: this.addressList[this.radio].phone,
                            consignee: this.addressList[this.radio].name,
                            remark: this.remark,
                            status: 'Unpaid'
                        }
                        this.$http.post('orders/add', order).then(res => {
                            // 减少Balance，更新OrderStatus
                            // 判断Balanceyesno充足
                            if (Number(this.user.money) < Number(item.price * item.buynumber)) {
                                this.$message({
                                    message: 'The balance is insufficient. Please recharge first',
                                    type: 'error',
                                    duration: 1500
                                });
                                return
                            }
                            // 如果该Commodity存在积分
                            if (data.jf) {
                                this.user.jf = Number(this.user.jf) + Number(item.price * item.buynumber);
                            }
                            this.user.money = this.user.money - item.price * item.buynumber;
                            // 更新userBalance
                            this.$http.post(`${this.userTableName}/update`, this.user).then(res => {
                                order.status = 'Paid'
                                var params = {
                                    orderid: orderId,
                                    page: 1,
                                    limit: 1,
                                }
                                this.$http.get('orders/list', {params: params}).then(res => {
                                    order.id = res.data.data.list[0].id;
                                    this.$http.post(`orders/update`, order).then(res => {
                                        // deleteShopping cart数据(如果yesShopping cart下单)
                                        if (item.id) {
                                            this.$http.post('cart/delete', [item.id]).then(res => {});
                                        }
                                        this.$message({
                                              message: 'Buy Success',
                                              type: 'success',
                                              duration: 1500,
                                              onClose: () => {
                                                this.$router.push('/index/shop-order/order');
                                              }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },

        // 积分兑换，生成Order，减少user积分，减少库存
        jfClick() {
            if (this.radio == -1) {
              this.$message({
                message: 'PleaseSelect the deliveryaddress',
                type: 'error',
                duration: 1500
              });
              return;
            }

            // 生成Order
            this.tableData.forEach(item => {
                // Order ID
                var orderId = this.createOrder();
                this.$http.get(`${item.tablename}/info/${item.goodid}`).then(res => {
                    let data = res.data.data;
                    // 减少库存
                    data.alllimittimes = data.alllimittimes - item.buynumber;
                    // 更新库存信息
                    this.$http.post(`${item.tablename}/update`, data).then(res => {
                        // 判断积分yesno充足
                        if (this.user.jf < this.totalPrice) {
                            this.$message({
                                message: '积分不足，兑换 Failure',
                                type: 'error',
                                duration: 1500
                            });
                            return
                        }
                        // AddOrder信息
                        let order = {
                            orderid: orderId,
                            tablename: item.tablename,
                            userid: this.user.id,
                            goodid: item.goodid,
                            goodname: item.goodname,
                            goodtype: item.goodtype,
                            picture: item.picture,
                            buynumber: item.buynumber,
                            discountprice: item.price,
                            price: item.price,
                            total: item.price * item.buynumber,
                            discounttotal: item.price * item.buynumber,
                            type: 2,
                            total: this.totalPrice,
                            address: this.addressList[this.radio].address,
                            tel: this.addressList[this.radio].phone,
                            consignee: this.addressList[this.radio].name,
                            status: 'Paid'
                        }
                        this.$http.post('orders/add', order).then(res => {
                            this.user.jf = this.user.jf - item.price * item.buynumber;
                            // 更新userBalance
                            this.$http.post(`${this.userTableName}/update`, this.user).then(res => {
                                this.$message({
                                      message: '兑换 Success',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                        this.$router.push('/index/shop-order/order');
                                      }
                                });
                            });
                        });
                    });
                });
            });
        },
        // 选座下单,生成Order，减少Balance，Add积分，减少库存，modification Status为Paid
        xzPayClick() {
            // 生成Order
            this.tableData.forEach(item => {
                // Order ID
                var orderId = this.createOrder();
                // 获取Commoditymore information
                this.$http.get(`${item.tablename}/info/${item.goodid}`).then(res => {
                    let data = res.data.data;
                    // 减少库存
                    data.alllimittimes = data.alllimittimes - item.buynumber;
                    // 获取已经被预定的座位号
                    let selectArray = data.selected?data.selected.split(','):[];
                    // 获取user预定的座位号
                    let activeArray = item.address.split(',');
                    // 新的预定座位号
                    let newSelectArray = selectArray.concat(activeArray);
                    // 赋Picture给参数
                    data.selected = newSelectArray.join(',');
                    // 更新库存,座位信息
                    this.$http.post(`${item.tablename}/update`, data).then(res => {
                        // AddOrder信息
                        let order = {
                            orderid: orderId,
                            tablename: item.tablename,
                            userid: this.user.id,
                            goodid: item.goodid,
                            goodname: item.goodname,
                            goodtype: item.goodtype,
                            picture: item.picture,
                            buynumber: item.buynumber,
                            discountprice: item.price,
                            price: item.price,
                            total: item.total,
                            discounttotal: item.total,
                            type: 1,
                            address: item.address,
                            remark: this.remark,
                            status: 'Unpaid'
                        }
                        this.$http.post('orders/add', order).then(res => {
                            // 减少Balance，更新OrderStatus
                            // 判断Balanceyesno充足
                            if (Number(this.user.money) < Number(item.price * item.buynumber)) {
                                this.$message({
                                    message: 'The balance is insufficient. Please recharge first',
                                    type: 'error',
                                    duration: 1500
                                });
                                return
                            }
                            // 如果该Commodity存在积分
                            if (data.jf) {
                                this.user.jf = Number(this.user.jf) + Number(data.jf * item.buynumber);
                            }
                            this.user.money = this.user.money - item.price * item.buynumber;
                            // 更新userBalance
                            this.$http.post(`${this.userTableName}/update`, this.user).then(res => {
                                order.status = 'Paid'
                                var params = {
                                    orderid: orderId,
                                    page: 1,
                                    limit: 1,
                                }
                                this.$http.get('orders/list', {params: params}).then(res => {
                                    order.id = res.data.data.list[0].id;
                                    this.$http.post(`orders/update`, order).then(res => {
                                        this.$message({
                                              message: 'Buy Success',
                                              type: 'success',
                                              duration: 1500,
                                              onClose: () => {
                                                this.$router.push('/index/shop-order/order');
                                              }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },
        // 选座下单,生成Order，减少Balance，Add积分，减少库存，modification Status为Paid
        xzJfClick() {
            // 生成Order
            this.tableData.forEach(item => {
                // Order ID
                var orderId = this.createOrder();
                // 获取Commoditymore information
                this.$http.get(`${item.tablename}/info/${item.goodid}`).then(res => {
                    let data = res.data.data;
                    // 减少库存
                    data.alllimittimes = data.alllimittimes - item.buynumber;
                    // 获取已经被预定的座位号
                    let selectArray = data.selected?data.selected.split(','):[];
                    // 获取user预定的座位号
                    let activeArray = item.address.split(',');
                    // 新的预定座位号
                    let newSelectArray = selectArray.concat(activeArray);
                    // 赋Picture给参数
                    data.selected = newSelectArray.join(',');
                    // 更新库存,座位信息
                    this.$http.post(`${item.tablename}/update`, data).then(res => {
                        // AddOrder信息
                        let order = {
                            orderid: orderId,
                            tablename: item.tablename,
                            userid: this.user.id,
                            goodid: item.goodid,
                            goodname: item.goodname,
                            goodtype: item.goodtype,
                            picture: item.picture,
                            buynumber: item.buynumber,
                            discountprice: item.price,
                            price: item.price,
                            total: item.price * item.buynumber,
                            discounttotal: 0,
                            type: 2,
                            address: item.address,
                            remark: this.remark,
                            status: 'Unpaid'

                        }
                        this.$http.post('orders/add', order).then(res => {
                            // 减少Balance，更新OrderStatus
                            // 判断Balanceyesno充足
                            if (Number(this.user.jf) < Number(item.jf * item.buynumber)) {
                                this.$message({
                                    message: '积分不足',
                                    type: 'error',
                                    duration: 1500
                                });
                                return
                            }
                            this.user.jf = this.user.jf - item.price * item.buynumber;
                            // 更新userBalance
                            this.$http.post(`${this.userTableName}/update`, this.user).then(res => {
                                order.status = 'Paid'
                                var params = {
                                    orderid: orderId,
                                    page: 1,
                                    limit: 1,
                                }
                                this.$http.get('orders/list', {params: params}).then(res => {
                                    order.id = res.data.data.list[0].id;
                                    this.$http.post(`orders/update`, order).then(res => {
                                        this.$message({
                                              message: 'Buy Success',
                                              type: 'success',
                                              duration: 1500,
                                              onClose: () => {
                                                this.$router.push('/index/shop-order/order');
                                              }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },
      createOrder() {
        let order = '';
        let now = new Date();
        order += now.getFullYear();
        order += now.getMonth() + 1;
        order += now.getDate();
        order += now.getHours();
        order += now.getMinutes();
        order += now.getSeconds();
        order += now.getMilliseconds();

        return order;
      }
    },
    computed: {
      totalPrice() {
        let totalPrice = 0;
        this.tableData.forEach(item => {
            totalPrice += item.price * item.buynumber;
        });

        return totalPrice.toFixed(2);
      },
      totalJifen() {
        let totalJifen = 0;
        this.tableData.forEach(item => {
          totalJifen += item.jf * this.buynumber;
        });

        return totalJifen;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .section {
    width: 900px;
    margin: 0 auto;
  }

  .shangpin {
    display: flex;
  }
  .buy {
    text-align: right;
    padding-right: 82px;
  }
</style>
