<template>
<div :style='{"padding":"20px 20px 40px","margin":"10px auto 0","borderColor":"#52b646","borderRadius":"12px","background":"#fff","borderWidth":"3px","width":"1200px","position":"relative","borderStyle":"solid dashed double double"}'>
    <el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 5px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"radial-gradient(circle, rgba(132,218,110,1) 0%, rgba(63,187,33,1) 81%, rgba(82,182,70,1) 100%)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="warning" size="mini" @click="backClick" class="el-icon-back">Back</el-button>
    <div class="section-title" :style='{"padding":"16px 0","margin":"20px 0","borderColor":"#52b646","color":"#52b646","borderRadius":"8px","textAlign":"center","background":"#eff9ee","borderWidth":"4px","fontSize":"24px","lineHeight":"1.5","borderStyle":"dashed dotted solid double"}'>My order</div>
    <el-tabs v-model="activeName" @tab-click="handleClick"">
      <el-tab-pane label="Unpaid" name="Unpaid"></el-tab-pane>
      <el-tab-pane label="Paid" name="Paid"></el-tab-pane>
      <el-tab-pane label="Dispatched" name="Dispatched"></el-tab-pane>
      <el-tab-pane label="Completed" name="Completed"></el-tab-pane>
      <el-tab-pane label="Refunded" name="Refunded"></el-tab-pane>
      <el-tab-pane label="Cancelled" name="Cancelled"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Order ID" prop="orderid"></el-table-column>
      <el-table-column label="Commodity" align="center" width="200px">
        <template slot-scope="scope">
          <div class="shangpin">
            <el-image style="width: 100px; height: 100px" :src="baseUrl + scope.row.picture" fit="fill"></el-image>
            <span style="margin-left: 10px" >{{ scope.row.goodname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Price">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1 || scope.row.type == 3"><span :style='{"fontSize":"12px"}'>￥</span>{{ scope.row.price }}</span>
          <span v-if="scope.row.type == 2">{{ scope.row.price }}积分</span>
        </template>
      </el-table-column>
      <el-table-column label="Amount" prop="buynumber"></el-table-column>
      <el-table-column label="Total Prices">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1 || scope.row.type == 3"><span :style='{"fontSize":"12px"}'>￥</span>{{ scope.row.total }}</span>
          <span v-if="scope.row.type == 2">{{ scope.row.total }}积分</span>
        </template>
      </el-table-column>
      <el-table-column label="address" prop="address"></el-table-column>
      <el-table-column label="Phone Number" prop="tel"></el-table-column>
      <el-table-column label="Consignee" prop="consignee"></el-table-column>
      <el-table-column label="Order placement time" prop="addtime"></el-table-column>
      <el-table-column label="Remarks" prop="remark"></el-table-column>
      <el-table-column label="Operation" width="150">
        <template slot-scope="scope">
          <el-button v-show="activeName == 'Unpaid'" type="success" :style='{"margin":"2px auto",}' size="mini" @click="pay(scope.row)">Pay</el-button>
          <el-button v-show="activeName == 'Unpaid'" type="danger" :style='{"margin":"2px auto",}' size="mini" @click="cancel(scope.row)">Cancel</el-button>
          <el-button v-show="activeName == 'Paid'" type="danger" :style='{"margin":"2px auto",}' size="mini" @click="refund(scope.row)">Refund</el-button>
          <el-button v-if="scope.row.logistics" type="warning" :style='{"margin":"2px auto",}' size="mini" @click="logistics(scope.row)">物流</el-button>
          <el-button v-show="activeName == 'Completed'" type="danger" :style='{"margin":"2px auto",}' size="mini" @click="returnGood(scope.row)">退货</el-button>
          <el-button v-show="activeName == 'Completed'" type="primary" :style='{"margin":"2px auto",}' size="mini" @click="toDetail(scope.row)">评价</el-button>
          <el-button v-show="activeName == 'Dispatched'" type="success" :style='{"margin":"2px auto",}' size="mini" @click="confirm(scope.row)">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
    
	<el-pagination
	  background
	  class="pagination"
	  :pager-count="7"
	  :page-size="pageSize"
	  :page-sizes="pageSizes"
	  prev-text="<"
	  next-text=">"
	  :hide-on-single-page="true"
	  :layout='["total","prev","pager","next","sizes","jumper"].join()'
	  :total="total"
	  :style='{"width":"1200px","padding":"0","margin":"20px auto","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
	  @current-change="curChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

    <el-dialog title="物流信息" :visible.sync="logisticsVisible" width="30%">
        <div v-html="logisticsText"></div>
    </el-dialog>
	
</div>
</template>

<script>
  import config from '@/config/config'
  export default {
    data() {
      return {
		layouts: '',
        baseUrl: config.baseUrl,
        activeName: 'Unpaid',
        tableData: [],
        total: 1,
        pageSize: 10,pageSizes: [10,20,30,50],
        totalPage: 1,
        session: {},
        userTableName: localStorage.getItem('UserTableName'),
        logisticsVisible: false,
        logisticsText: ''
      }
    },
    created() {
      this.getSession();
      this.getMyOrderList(1);
    },
    methods: {
      backClick() {
          this.$router.push('/index/center')
      },
      getSession() {
        this.$http.get(this.userTableName+'/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.session = res.data.data;
          }
        });
      },
      handleClick(tab, event) {
        tab.activeName = event.target.outerText;
        this.getMyOrderList(1);
      },
      toDetail(row) {
          this.$router.push({path: '/index/'+row.tablename+'Detail', query: {discussObj: JSON.stringify(row)}});
      },
      handleAction(index, row) {
        if (index == 'Paid' && this.session.money < row.total) {
          this.$message.error('The balance is insufficient. Please recharge first');
          return;
        }

        row.status = index;
        this.$http.post('orders/update', row).then(res => {
          if (res.data.code == 0) {
            if (index == 'Paid') this.session.money -= row.total;
            if (index == 'Refunded' && row.type == 1) this.session.money += row.total;
            if (index == 'Refunded' && row.type == 2) this.session.jifen += row.total;
            if (index == 'Paid' || index == 'Refunded') {
              this.session.money = this.session.money.toFixed(2);
              this.$http.post(this.userTableName+'/update', this.session).then(res => {});
            }
            this.$message({
              message: 'Operation Success',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getMyOrderList(1);
              }
            });
          }
        });
      },
        // Refund
        refund(item) {
            this.$confirm(`SureRefund吗？Refund金额将Back账户中。`, "提示", {
                confirmButtonText: "Sure",
                cancelButtonText: "Cancel",
                type: "warning"
            }).then(() => {
                // 获取Commoditymore information
                this.$http.get(item.tablename+'/info/'+item.goodid, {}).then(res => {
                    // Commodity information
                    let good = res.data.data;
                    // user当前user信息
                    let table = localStorage.getItem("UserTableName");
                    this.$http.get(table+'/session', {}).then(res => {
                        this.user = res.data.data;
                        if(item.type==1||item.type==3) {
                            // 如果该Commodity存在积分
                            if (good.jf) {
                                this.user.jf = Number(this.user.jf) - Number(item.price * item.buynumber);
                            }
                            this.user.money = Number(this.user.money) + Number(item.total);
                            // 更新userBalance
                            this.$http.post(table+'/update', this.user).then(res => {
                                item.status = 'Refunded'
                                this.$http.post(`orders/update`, item).then(res => {
                                    this.$message({
                                      message: 'Refund Success',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                        this.getMyOrderList(1);
                                      }
                                    });
                                });
                            });
                        } else if(item.type==2) {
                            this.user.jf = Number(this.user.jf) + Number(item.total);
                            // 更新userBalance
                            this.$http.post(table+'/update', this.user).then(res => {
                                item.status = 'Refunded'
                                this.$http.post(`orders/update`, item).then(res => {
                                    this.$message({
                                      message: 'Refund Success',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                        this.getMyOrderList(1);
                                      }
                                    });
                                });
                            });

                        }
                    });
                });
            });
        },
        //物流
        logistics(row) {
            this.logisticsText = row.logistics;
            this.logisticsVisible = true;
        },
        //退货
        returnGood(item) {
            this.$confirm(`Sure退货吗？Refund金额将Back账户中。`, "提示", {
                confirmButtonText: "Sure",
                cancelButtonText: "Cancel",
                type: "warning"
            }).then(() => {
                // 获取Commoditymore information
                this.$http.get(item.tablename+'/info/'+item.goodid, {}).then(res => {
                    // Commodity information
                    let good = res.data.data;
                    // user当前user信息
                    let table = localStorage.getItem("UserTableName");
                    this.$http.get(table+'/session', {}).then(res => {
                        this.user = res.data.data;
                        if(item.type==1||item.type==3) {
                            // 如果该Commodity存在积分
                            if (good.jf) {
                                this.user.jf = Number(this.user.jf) - Number(item.price * item.buynumber);
                            }
                            this.user.money = Number(this.user.money) + Number(item.total);
                            // 更新userBalance
                            this.$http.post(table+'/update', this.user).then(res => {
                                item.status = 'Refunded'
                                this.$http.post(`orders/update`, item).then(res => {
                                    this.$message({
                                      message: '退货 Success',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                        this.getMyOrderList(1);
                                      }
                                    });
                                });
                            });
                        } else if(item.type==2) {
                            this.user.jf = Number(this.user.jf) + Number(item.total);
                            // 更新userBalance
                            this.$http.post(table+'/update', this.user).then(res => {
                                item.status = 'Refunded'
                                this.$http.post(`orders/update`, item).then(res => {
                                    this.$message({
                                      message: '退货 Success',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                        this.getMyOrderList(1);
                                      }
                                    });
                                });
                            });
                        }
                    });
                });
            });
        },

        // Pay
        pay(item) {
            // 获取Commoditymore information
            this.$http.get(item.tablename+'/info/'+item.goodid, {}).then(res => {
                // Commodity information
                let data = res.data.data;
                // user当前user信息
                let table = localStorage.getItem("UserTableName");
                this.$http.get(table+'/session', {}).then(res => {
                    this.user = res.data.data;
                    // 判断Balanceyesno充足
                    if (Number(this.user.money) < Number(item.total)) {
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
                    this.user.money = this.user.money - item.total;
                    // 更新userBalance
                    this.$http.post(table+'/update', this.user).then(res => {
                        item.status = 'Paid'
                        this.$http.post(`orders/update`, item).then(res => {
                            this.$message({
                              message: 'Pay Success',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                this.getMyOrderList(1);
                              }
                            });
                        });
                    });
                });
            });
        },
      confirm(item){
          this.$confirm(`yesnoSure收货？`, "提示", {
              confirmButtonText: "Sure",
              cancelButtonText: "Cancel",
              type: "warning"
          }).then(() => {
              item.status = 'Completed'
              this.$http.post(`orders/update`, item).then(res => {
                  this.$message({
                    message: '确认收货 Success',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.getMyOrderList(1);
                    }
                  });
              });
          });
      },
      cancel(item){
          this.$confirm(`yesnoCancelOrder？`, "提示", {
              confirmButtonText: "Sure",
              cancelButtonText: "Cancel",
              type: "warning"
          }).then(() => {
              item.status = 'Cancelled'
              this.$http.post(`orders/update`, item).then(res => {
                  this.$message({
                    message: 'OrderCancel Success',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.getMyOrderList(1);
                    }
                  });
              });
          });
      },
      getMyOrderList(page) {
        this.$http.get('orders/list', {params: {page, limit: this.pageSize,sort:'addtime',order:'desc', userid: localStorage.getItem('userid'), status: this.activeName}}).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
            this.totalPage = res.data.data.totalPage;
          }
        });
      },
      curChange(page) {
        this.getMyOrderList(page);
      },
      prevClick(page) {
        this.getMyOrderList(page);
      },
      nextClick(page) {
        this.getMyOrderList(page);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.section {
	  width: 1000px;
	  margin: 0 auto;
	}

	.shangpin {
	  display: flex;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #666;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #52b646;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #FFF;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #52b646;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #606266;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}
	
	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 3px;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
</style>
