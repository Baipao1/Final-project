<template>
<div :style='{"padding":"20px 20px 40px","margin":"10px auto 0","borderColor":"#52b646","borderRadius":"12px","background":"#fff","borderWidth":"3px","width":"1200px","position":"relative","borderStyle":"solid dashed double double"}'>
    <div class="section-title" :style='{"padding":"16px 0","margin":"20px 0","borderColor":"#52b646","color":"#52b646","borderRadius":"8px","textAlign":"center","background":"#eff9ee","borderWidth":"4px","fontSize":"24px","lineHeight":"1.5","borderStyle":"dashed dotted solid double"}'>Shopping cart</div>
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" width="50" align="center" />
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
          <span :style='{"fontSize":"12px"}'>￥</span>{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column
        label="Amount">
        <template slot-scope="scope">
          <el-input-number :min="1" v-model="scope.row.buynumber" @change="(value) => handleChange(value, scope.$index, scope.row)" size="small"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="Total Prices">
        <template slot-scope="scope">
          <span :style='{"fontSize":"12px"}'>￥</span>{{ (scope.row.price * scope.row.buynumber).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="Operation" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="buy" v-if="tableData.length > 0">
      <span style="color: red;margin-right: 10px;font-weight: 700;">Total Prices：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
      <el-button
        type="warning"
        @click="buyClick">Pay</el-button>
    </div>
</div>
</template>

<script>
  import config from '@/config/config'
  export default {
    data() {
      return {
        baseUrl: config.baseUrl,
        tableData: [],
        selRows:[]
      }
    },
    created() {
      this.getCartList();
    },
    methods: {
      handleSelectionChange(e){
          this.selRows = e
      },
      getCartList() {
        this.$http.get('cart/list', {params: {page: 1, limit: 1000, userid: localStorage.getItem('userid')}}).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.list;
          }
        });
      },
      handleChange(value, index, row) {
        this.$http.get(`${row.tablename}/detail/${row.goodid}`).then(res => {
          if (res.data.code == 0 && value > res.data.data.onelimittimes) {
            this.tableData[index].buynumber = --value;
            this.$message.error(`每人单次只能Buy${res.data.data.onelimittimes}件`);
          }
          if (res.data.code == 0 && value <= res.data.data.onelimittimes) {
            row.buynumber = value;
            this.$http.post('cart/update', row).then(res => {});
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('yesno确认delete?', '提示', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let delIds = new Array();
          delIds.push(row.id);
          this.$http.post('cart/delete', delIds).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: 'delete Success!',
                duration: 1500,
                onClose: () => {
                  this.getCartList();
                }
              });
            }
          });
        });
      },
      buyClick() {
        if(this.selRows.length==0) {
            this.$message({
                type: 'warning',
                message: 'PleaseChooseCommodity',
                duration: 1500,
            });
            return
        }
        var gn = "";
        for(let x in this.selRows){
            var g = this.selRows[x];
            console.log(g.goodname)
            let that = this;
            this.$http.get(`${g.tablename}/detail/${g.goodid}`).then(res => {
              if (res.data.code == 0 && g.buynumber > res.data.data.alllimittimes) {
                gn = g.goodname;
              }
            });
        }
        
        setTimeout(() => {
            if(gn=="") {
                localStorage.setItem('orderGoods', JSON.stringify(this.selRows));
                this.$router.push('/index/shop-order/orderConfirm');
            } else {
                this.$message.error(gn+` 库存不足`);
                return;
            }
        }, 200)
      }
    },
    computed: {
      totalPrice() {
            let totalPrice = 0;
            for(let x in this.selRows){
                  totalPrice += Number(this.selRows[x].price) * Number(this.selRows[x].buynumber)
            }
            return totalPrice.toFixed(2);
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
