<template>
	<div class="main-content" :style='{"padding":"30px","backgroundAttachment":"fixed","flexWrap":"wrap","background":"url(http://codegen.caihongy.cn/20230312/52c1bcab43064c72aa492e0f342d2666.jpg)","flexDirection":"row-reverse","display":"flex","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","height":"calc(100vh - 120px)"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"border":"1px solid #6F6F97","width":"140px","padding":"5px","margin":"0 0 20px 10px","background":"rgba(255,255,255,.8)"}' :inline="true" :model="searchForm">
				<el-row :style='{"flexDirection":"column","display":"flex"}' >
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#000","textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">Order ID</label>
						<el-input v-model="searchForm.orderid" placeholder="Order ID" clearable></el-input>
					</div>
					<div :style='{"margin":"0","flexDirection":"column","display":"flex"}'>
						<label :style='{"margin":"0 10px 0 0","color":"#000","textAlign":"center","display":"inline-block","width":"100%","lineHeight":"40px","fontSize":"14px","fontWeight":"500","height":"40px"}' class="item-label">Product name</label>
						<el-input v-model="searchForm.goodname" placeholder="Product name" clearable></el-input>
					</div>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","outline":"none","margin":"6px 0 0","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' type="success" @click="search()">Search</el-button>
				</el-row>

				<el-row :style='{"margin":"20px 0","flexDirection":"column","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'add')" type="success" @click="addOrUpdateHandler()">add</el-button>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'delete')" :disabled="dataListSelections.length <= 0" type="danger" @click="deleteHandler()">delete</el-button>


					<download-excel v-if="isAuth('orders'+'/'+orderStatus,'导出')" class="export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "Order.xls">
						<!-- 导出excel -->
						<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' type="danger">导出</el-button>
					</download-excel>


					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'日销量')" type="warning" @click="dayNumberChartDialog()">日销量</el-button>

					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'月销量')" type="warning" @click="monthNumberChartDialog()">月销量</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'年销量')" type="warning" @click="yearNumberChartDialog()">年销量</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}'	v-if="isAuth('orders'+'/'+orderStatus,'品销量')"	type="warning"	@click="goodnameNumberChartDialog()">Commodity销量</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'类销量')" type="warning" @click="goodtypeNumberChartDialog()">类型销量</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'日销额')" type="warning" @click="dayAmountChartDialog()">日销额</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'月销额')" type="warning" @click="monthAmountChartDialog()">月销额</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'年销额')" type="warning" @click="yearAmountChartDialog()">年销额</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'品销额')" type="warning" @click="goodnameAmountChartDialog()">Commodity销额</el-button>
            
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 2px 6px 0px rgba(0,0,0,0.3020)","margin":"0 0 10px","outline":"none","color":"#fff","borderRadius":"30px","background":"#67D4B2","width":"100%","fontSize":"14px","height":"40px"}' v-if="isAuth('orders'+'/'+orderStatus,'类销额')" type="warning" @click="goodtypeAmountChartDialog()">类型销额</el-button>
				</el-row>
			</el-form>
			
			<!-- <div> -->
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#6F6F97","borderWidth":"1px","background":"#fff","flex":"1","width":"calc(100% - 140px)","borderStyle":"solid","height":"fit-content"}' 
					v-if="isAuth('orders'+'/'+orderStatus,'查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='false' label="List" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='false'  
						prop="orderid"
					label="Order ID">
						<template slot-scope="scope">
							{{scope.row.orderid}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="goodname"
					label="Product name">
						<template slot-scope="scope">
							{{scope.row.goodname}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="picture" width="200" label="Commodity Picture">
						<template slot-scope="scope">
							<div v-if="scope.row.picture">
								<img v-if="scope.row.picture.substring(0,4)=='http'" :src="scope.row.picture.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.picture.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>No picture</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="buynumber"
					label="BuyAmount">
						<template slot-scope="scope">
							{{scope.row.buynumber}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="price"
					label="Price">
						<template slot-scope="scope">
							{{scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="discountprice"
					label="Discount Price">
						<template slot-scope="scope">
							{{scope.row.discountprice}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="total"
					label="Total Price">
						<template slot-scope="scope">
							{{scope.row.total}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="discounttotal"
					label="Total discount Price">
						<template slot-scope="scope">
							{{scope.row.discounttotal}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="type"
						:formatter="orderStatusFormatter"
					label="Payment type">
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="status"
					label="Status">
						<template slot-scope="scope">
							{{scope.row.status}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="address"
					label="address">
						<template slot-scope="scope">
							{{scope.row.address}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="tel"
					label="Phone Number">
						<template slot-scope="scope">
							{{scope.row.tel}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="consignee"
					label="Consignee">
						<template slot-scope="scope">
							{{scope.row.consignee}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="remark"
					label="Remarks">
						<template slot-scope="scope">
							{{scope.row.remark}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false'  
						prop="goodtype"
					label="Commodity类型">
						<template slot-scope="scope">
							{{scope.row.goodtype}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='false' prop="tel" label="Order placement time">
						<template slot-scope="scope">
							{{scope.row.addtime}}
						</template>
					</el-table-column>
					<el-table-column width="300" label="Operation">
						<template slot-scope="scope">
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('orders'+'/'+orderStatus,'查看')" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">more</el-button>
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if=" isAuth('orders'+'/'+orderStatus,'modification ')" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">modification </el-button>

							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('orders'+'/'+orderStatus,'物流')" type="primary" size="mini" @click="logisticsUpdate(scope.row.id)">物流</el-button>
                
							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('orders'+'/'+orderStatus,'发货')" type="primary" size="mini" @click="updateHandler(scope.row)">发货</el-button>

							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('orders'+'/'+orderStatus,'确认收货')" type="primary" size="mini" @click="updateHandler2(scope.row)">确认收货</el-button>




							<el-button :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"0 10px 4px 0","outline":"none","color":"#000","borderRadius":"30px","background":"#E4E4E4","width":"auto","fontSize":"14px","height":"32px"}' v-if="isAuth('orders'+'/'+orderStatus,'delete') " type="danger" size="mini" @click="deleteHandler(scope.row.id)">delete</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					@size-change="sizeChangeHandle"
					@current-change="currentChangeHandle"
					:current-page="pageIndex"
					background
					:page-sizes="[10, 20, 30, 50]"
					:page-size="pageSize"
					:layout="layouts.join()"
					:total="totalPage"
					prev-text="<"
					next-text=">"
					:hide-on-single-page="true"
					:style='{"padding":"0","margin":"20px 0","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"100%","fontWeight":"500"}'
				></el-pagination>
			<!-- </div> -->
		</template>
		
		<!-- Add/modification 页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>





		<el-dialog
		  title="日销量"
		  :visible.sync="dayNumberChartVisiable"
		  width="800">
			<div id="dayNumberChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="dayNumberChartDialog">Back</el-button>
		  </span>
		</el-dialog>

		<el-dialog
		  title="月销量"
		  :visible.sync="monthNumberChartVisiable"
		  width="800">
			<div id="monthNumberChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="monthNumberChartDialog">Back</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="年销量"
		  :visible.sync="yearNumberChartVisiable"
		  width="800">
			<div id="yearNumberChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="yearNumberChartDialog">Back</el-button>
		  </span>
		</el-dialog>
    
		<el-dialog
		  title="Commodity销量"
		  :visible.sync="goodnameNumberChartVisiable"
		  width="800">
			<div id="goodnameNumberChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodnameNumberChartDialog">Back</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="类型销量"
		  :visible.sync="goodtypeNumberChartVisiable"
		  width="800">
			<div id="goodtypeNumberChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodtypeNumberChartDialog">Back</el-button>
		  </span>
		</el-dialog>
    
		<el-dialog
		  title="日销额"
		  :visible.sync="dayAmountChartVisiable"
		  width="800">
			<div id="dayAmountChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="dayAmountChartDialog">Back</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="月销额"
		  :visible.sync="monthAmountChartVisiable"
		  width="800">
			<div id="monthAmountChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="monthAmountChartDialog">Back</el-button>
		  </span>
		</el-dialog>
    
		<el-dialog
		  title="年销额"
		  :visible.sync="yearAmountChartVisiable"
		  width="800">
			<div id="yearAmountChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="yearAmountChartDialog">Back</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="Commodity销额"
		  :visible.sync="goodnameAmountChartVisiable"
		  width="800">
			<div id="goodnameAmountChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodnameAmountChartDialog">Back</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="类型销额"
		  :visible.sync="goodtypeAmountChartVisiable"
		  width="800">
			<div id="goodtypeAmountChart" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="goodtypeAmountChartDialog">Back</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      chartVisiable1: false,
      chartVisiable2: false,
      chartVisiable3: false,
      chartVisiable4: false,
      chartVisiable5: false,
      dayNumberChartVisiable: false,
      monthNumberChartVisiable: false,
      yearNumberChartVisiable: false,
      goodnameNumberChartVisiable: false,
      goodtypeNumberChartVisiable: false,
      dayAmountChartVisiable: false,
      monthAmountChartVisiable: false,
      yearAmountChartVisiable: false,
      goodnameAmountChartVisiable: false,
      goodtypeAmountChartVisiable: false,
      addOrUpdateFlag:false,
      layouts: ["total","prev","pager","next","sizes","jumper"],
      orderStatus: this.$route.params.status,
//导出excel
      json_fields: {
      "Order ID": "orderid",    //常规字段
      "Commodity表名": "tablename",    //常规字段
      "userid": "userid",    //常规字段
      "Commodityid": "goodid",    //常规字段
      "Product name": "goodname",    //常规字段
      "Commodity Picture": "picture",    //常规字段
      "BuyAmount": "buynumber",    //常规字段
      "Price": "price",    //常规字段
      "Discount Price": "discountprice",    //常规字段
      "Total Price": "total",    //常规字段
      "Total discount Price": "discounttotal",    //常规字段
      "Payment type": "type",    //常规字段
      "Status": "status",    //常规字段
      "address": "address",    //常规字段
      "Phone Number": "tel",    //常规字段
      "Consignee": "consignee",    //常规字段
      "Remarks": "remark",    //常规字段
      "物流": "logistics",    //常规字段
      "Commodity类型": "goodtype",    //常规字段
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {
  },
//监听Order表参数yesno变化，从而调取接口
  watch: {
  '$route' (to, from) { //监听路由yesno变化
    if(this.$route.params.status){//判断Statusyesno有Picture
      //调数据
        this.orderStatus=this.$route.params.status;
        this.getDataList();
        this.contentStyleChange()
    }
  }
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {

    orderStatusFormatter: function(row, column) {
      var temp = ''
      // 处理逻辑 保存接口 数据，进行匹配 name
      switch (row.type-0) {
        case 1:
          temp = 'Cash'
          break
        case 2:
          temp = '积分'
          break
        case 3:
          temp = '拼团'
          break
      }
      return temp
    },
    updateHandler(row) {
      this.$confirm(`Sure进行发货Operation?`, "提示", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        row.status = "Dispatched";
        this.$http({
          url: `orders/update`,
          method: "post",
          data: row
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "Operation Success",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
             this.$message.error(data.msg);
          }
        });
      });
    },
    updateHandler2(row) {
      this.$confirm(`Sure已收货?`, "提示", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        row.status = "Completed";
        this.$http({
          url: `orders/update`,
          method: "post",
          data: row
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "Operation Success",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    //物流
    logisticsUpdate(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'logistics';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    contentStyleChange() {
      this.contentPageStyleChange()
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      // if(this.contents.pageTotal) arr.push('total')
      // if(this.contents.pageSizes) arr.push('sizes')
      // if(this.contents.pagePrevNext){
      //   arr.push('prev')
      //   if(this.contents.pagePager) arr.push('pager')
      //   arr.push('next')
      // }
      // if(this.contents.pageJumper) arr.push('jumper')
      // this.layouts = arr.join()
      // this.contents.pageEachNum = 10
    },

    dayNumberChartDialog() {
      this.dayNumberChartVisiable = !this.dayNumberChartVisiable;
      this.$nextTick(()=>{
        var dayNumberChart = echarts.init(document.getElementById("dayNumberChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/buynumber/日`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat(res[i].total));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '日销量',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    dayNumberChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        dayNumberChart.resize();
                    };
                }
            }
        });
      })
    },
    
    monthNumberChartDialog() {
      this.monthNumberChartVisiable = !this.monthNumberChartVisiable;
      this.$nextTick(()=>{
        var monthNumberChart = echarts.init(document.getElementById("monthNumberChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/buynumber/月`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat(res[i].total));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '月销量',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    monthNumberChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        monthNumberChart.resize();
                    };
                }
            }
        });
      })
    },
    
    yearNumberChartDialog() {
      this.yearNumberChartVisiable = !this.yearNumberChartVisiable;
      this.$nextTick(()=>{
        var yearNumberChart = echarts.init(document.getElementById("yearNumberChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/buynumber/年`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat(res[i].total));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '年销量',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    yearNumberChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        yearNumberChart.resize();
                    };
                }
            }
        });
      })
    },
    
    goodnameNumberChartDialog() {
      this.goodnameNumberChartVisiable = !this.goodnameNumberChartVisiable;
      this.$nextTick(()=>{
        var goodnameNumberChart = echarts.init(document.getElementById("goodnameNumberChart"),'macarons');
        this.$http({
            url: `orders/value/goodname/buynumber`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].goodname);
                    yAxis.push(parseFloat(res[i].total));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].goodname
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: 'Commodity销量',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    goodnameNumberChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        goodnameNumberChart.resize();
                    };
                }
            }
        });
      })
    },
    
    goodtypeNumberChartDialog() {
      this.goodtypeNumberChartVisiable = !this.goodtypeNumberChartVisiable;
      this.$nextTick(()=>{
        var goodtypeNumberChart = echarts.init(document.getElementById("goodtypeNumberChart"),'macarons');
        this.$http({
            url: `orders/value/goodtype/buynumber`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].goodtype);
                    yAxis.push(parseFloat(res[i].total));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].goodtype
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '类型销量',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    goodtypeNumberChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        goodtypeNumberChart.resize();
                    };
                }
            }
        });
      })
    },
    
    dayAmountChartDialog() {
      this.dayAmountChartVisiable = !this.dayAmountChartVisiable;
      this.$nextTick(()=>{
        var dayAmountChart = echarts.init(document.getElementById("dayAmountChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/total/日`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat((res[i].total)).toFixed(2));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '日销额',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    dayAmountChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        dayAmountChart.resize();
                    };
                }
            }
        });
      })
    },
    
    monthAmountChartDialog() {
      this.monthAmountChartVisiable = !this.monthAmountChartVisiable;
      this.$nextTick(()=>{
        var monthAmountChart = echarts.init(document.getElementById("monthAmountChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/total/月`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat((res[i].total)).toFixed(2));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '月销额',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    monthAmountChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        monthAmountChart.resize();
                    };
                }
            }
        });
      })
    },
    
    yearAmountChartDialog() {
      this.yearAmountChartVisiable = !this.yearAmountChartVisiable;
      this.$nextTick(()=>{
        var yearAmountChart = echarts.init(document.getElementById("yearAmountChart"),'macarons');
        this.$http({
            url: `orders/value/addtime/total/年`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].addtime);
                    yAxis.push(parseFloat((res[i].total)).toFixed(2));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].addtime
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '年销额',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    yearAmountChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        yearAmountChart.resize();
                    };
                }
            }
        });
      })
    },
    
    goodnameAmountChartDialog() {
      this.goodnameAmountChartVisiable = !this.goodnameAmountChartVisiable;
      this.$nextTick(()=>{
        var goodnameAmountChart = echarts.init(document.getElementById("goodnameAmountChart"),'macarons');
        this.$http({
            url: `orders/value/goodname/total`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].goodname);
                    yAxis.push(parseFloat((res[i].total)).toFixed(2));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].goodname
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: 'Commodity销额',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    goodnameAmountChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        goodnameAmountChart.resize();
                    };
                }
            }
        });
      })
    },
    
    goodtypeAmountChartDialog() {
      this.goodtypeAmountChartVisiable = !this.goodtypeAmountChartVisiable;
      this.$nextTick(()=>{
        var goodtypeAmountChart = echarts.init(document.getElementById("goodtypeAmountChart"),'macarons');
        this.$http({
            url: `orders/value/goodtype/total`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].goodtype);
                    yAxis.push(parseFloat((res[i].total)).toFixed(2));
                    pArray.push({
                    value: parseFloat((res[i].total)),
                    name: res[i].goodtype
                    })
                    var option = {};
                    option = {
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        title: {
                            text: '类型销额',
                            left: 'center'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'bar'
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    goodtypeAmountChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        goodtypeAmountChart.resize();
                    };
                }
            }
        });
      })
    },







    init () {
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
        status: this.$route.params.status,
      }
           if(this.searchForm.orderid!='' && this.searchForm.orderid!=undefined){
            params['orderid'] = '%' + this.searchForm.orderid + '%'
          }
           if(this.searchForm.goodname!='' && this.searchForm.goodname!=undefined){
            params['goodname'] = '%' + this.searchForm.goodname + '%'
          }
      this.$http({
        url: "orders/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // Add/modification 
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // delete
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`Sure进行[${id ? "delete" : "批量delete"}]Operation?`, "提示", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "orders/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "Operation Success",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
	//导出excel
	.export-excel-wrapper{
		display: inline-block;
	}
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 2px solid #67D4B2;
				border-radius: 30px;
				padding: 0 12px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #000;
				background: #F8F6F7;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 2px solid #67D4B2;
				border-radius: 30px;
				padding: 0 10px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #000;
				background: #F8F6F7;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 2px solid #67D4B2;
				border-radius: 30px;
				padding: 0 10px 0 30px;
				box-shadow: 0 0 0px rgba(64, 158, 255, .5);
				outline: none;
				color: #000;
				background: #F8F6F7;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: #999;
				font-weight: 500;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				background: #67D4B2;
				border-color: #fff;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				color: #fff;
				word-break: break-all;
				white-space: normal;
				font-weight: bold;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: #fff;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #000;
				background: #fff;
				border-color: #6F6F97;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 12px 0;
				color: #000;
				background: rgba(103,212,178,.3);
				border-color: #6F6F97;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 12px 0;
				color: #000;
				background: #fff;
				border-color: #6F6F97;
				border-width: 0 1px 1px 0;
				border-style: solid;
				text-align: center;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: #666;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
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
	
	.main-content .el-pagination /deep/ .btn-next {
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
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
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
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
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

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
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
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #409EFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #67D4B2;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				padding: 0 4px;
				margin: 0 5px;
				color: #FFF;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				border-radius: 2px;
				background: #67D4B2;
				text-align: center;
				min-width: 30px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				width: 100px;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
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
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: #606266;
				display: inline-block;
				vertical-align: top;
				font-size: 13px;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
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
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
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
