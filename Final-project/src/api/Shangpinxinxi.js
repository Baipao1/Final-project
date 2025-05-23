import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import ShangpinxinxiModel from '../models/ShangpinxinxiModel'
import md5 from 'md5-node'
import util from '../lib/util'
import OrdersModel from '../models/OrdersModel'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import request from 'request'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
const redis = require('redis')




export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let pricestart = req.query.pricestart;
			let priceend = req.query.priceend;
			if (pricestart && priceend) {
				let pricebetween = [];
				pricebetween.push(pricestart);
				pricebetween.push(priceend);
				where.price = {
					[Op.between]: pricebetween
				}
			}
			let shangpinmingcheng = req.query.shangpinmingcheng
			if (shangpinmingcheng) {

				if (shangpinmingcheng.indexOf('%') != -1) {
					where.shangpinmingcheng = {
						[Op.like]: shangpinmingcheng
					}
				} else {
					where.shangpinmingcheng = {
						[Op.eq]: shangpinmingcheng
					}
				}
			}
			let tupian = req.query.tupian
			if (tupian) {

				if (tupian.indexOf('%') != -1) {
					where.tupian = {
						[Op.like]: tupian
					}
				} else {
					where.tupian = {
						[Op.eq]: tupian
					}
				}
			}
			let shangpinfenlei = req.query.shangpinfenlei
			if (shangpinfenlei) {

				if (shangpinfenlei.indexOf('%') != -1) {
					where.shangpinfenlei = {
						[Op.like]: shangpinfenlei
					}
				} else {
					where.shangpinfenlei = {
						[Op.eq]: shangpinfenlei
					}
				}
			}
			let guige = req.query.guige
			if (guige) {

				if (guige.indexOf('%') != -1) {
					where.guige = {
						[Op.like]: guige
					}
				} else {
					where.guige = {
						[Op.eq]: guige
					}
				}
			}
			let pinpai = req.query.pinpai
			if (pinpai) {

				if (pinpai.indexOf('%') != -1) {
					where.pinpai = {
						[Op.like]: pinpai
					}
				} else {
					where.pinpai = {
						[Op.eq]: pinpai
					}
				}
			}
			let shangpinxiangqing = req.query.shangpinxiangqing
			if (shangpinxiangqing) {

				if (shangpinxiangqing.indexOf('%') != -1) {
					where.shangpinxiangqing = {
						[Op.like]: shangpinxiangqing
					}
				} else {
					where.shangpinxiangqing = {
						[Op.eq]: shangpinxiangqing
					}
				}
			}
			let clicktime = req.query.clicktime
			if (clicktime) {

				if (clicktime.indexOf('%') != -1) {
					where.clicktime = {
						[Op.like]: clicktime
					}
				} else {
					where.clicktime = {
						[Op.eq]: clicktime
					}
				}
			}
			let clicknum = req.query.clicknum
			if (clicknum) {

				if (clicknum.indexOf('%') != -1) {
					where.clicknum = {
						[Op.like]: clicknum
					}
				} else {
					where.clicknum = {
						[Op.eq]: clicknum
					}
				}
			}
			let price = req.query.price
			if (price) {

				if (price.indexOf('%') != -1) {
					where.price = {
						[Op.like]: price
					}
				} else {
					where.price = {
						[Op.eq]: price
					}
				}
			}

			let result = await ShangpinxinxiModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let pricestart = req.query.pricestart;
			let priceend = req.query.priceend;
			if (pricestart && priceend) {
				let pricebetween = [];
				pricebetween.push(pricestart);
				pricebetween.push(priceend);
				where.price = {
					[Op.between]: pricebetween
				}
			}
			let shangpinmingcheng = req.query.shangpinmingcheng
			if (shangpinmingcheng) {

				if (shangpinmingcheng.indexOf('%') != -1) {
					where.shangpinmingcheng = {
						[Op.like]: shangpinmingcheng
					}
				} else {
					where.shangpinmingcheng = {
						[Op.eq]: shangpinmingcheng
					}
				}
			}
			let shangpinfenlei = req.query.shangpinfenlei
			if (shangpinfenlei) {

				if (shangpinfenlei.indexOf('%') != -1) {
					where.shangpinfenlei = {
						[Op.like]: shangpinfenlei
					}
				} else {
					where.shangpinfenlei = {
						[Op.eq]: shangpinfenlei
					}
				}
			}
			let pinpai = req.query.pinpai
			if (pinpai) {

				if (pinpai.indexOf('%') != -1) {
					where.pinpai = {
						[Op.like]: pinpai
					}
				} else {
					where.pinpai = {
						[Op.eq]: pinpai
					}
				}
			}
			let price = req.query.price
			if (price) {

				if (price.indexOf('%') != -1) {
					where.price = {
						[Op.like]: price
					}
				} else {
					where.price = {
						[Op.eq]: price
					}
				}
			}


			let result = await ShangpinxinxiModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')


			const userinfo = await ShangpinxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, 'Add Failure！')
			} else {

				toRes.session(res, 0, 'Add Success！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, 'Please login后再Operation', '', 401)
			}

			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')


			const userinfo = await ShangpinxinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, 'Add Failure！')
			} else {

				toRes.session(res, 0, 'Add Success！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update', async (req, res) => {

		try {



			await ShangpinxinxiModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, 'Editor Success！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// delete接口
	api.post('/delete', async (req, res) => {

		try {

			await ShangpinxinxiModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, 'delete Success！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// more接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {

            await ShangpinxinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})
			const recordInfo = await ShangpinxinxiModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ShangpinxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // more接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {

            await ShangpinxinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})
			const recordInfo = await ShangpinxinxiModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ShangpinxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM shangpinxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})




	// 智能 Recommend接口
	api.get('/autoSort', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5
			let sort = req.query.sort || 'clicktime'
			let order = req.query.order || 'desc'

            sort = "clicknum"

			let where = {}
			let sfsh = req.query.sfsh
			if (sfsh) {
				where.sfsh = {
					[Op.eq]: sfsh
				}
			}

			let result = await ShangpinxinxiModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 智能 Recommend接口
	api.get('/autoSort2', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5

			let whereOrder = {}
			whereOrder.userid = {
				[Op.eq]: jwt.decode(req.headers.token).id
			}
			whereOrder.tablename = {
				[Op.eq]: 'shangpinxinxi'
			}
			let orderList = await OrdersModel.findAndCountAll({
				attributes: ['goodtype'],
				order: [['addtime', 'desc']],
				where: whereOrder,
				offset: (page - 1) * limit,
				limit
			})
			
			let arr = []
			orderList.rows.forEach(item => {
				arr.push(item.dataValues.goodtype)
			})
			
			let where = {}
			where.shangpinfenlei = {
				[Op.in]: arr,
			}

			let result = await ShangpinxinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			where = {}
			where.shangpinfenlei = {
				[Op.notIn]: arr,
			}

			let result1 = await ShangpinxinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit: limit - result.count
			})
			
			result.rows = result.rows.concat(result1.rows)
			
			result.currPage = page
			result.pageSize = limit
			result.total = result.count + result1.count
			result.count = result.total 

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})





	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "shangpinxinxi"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM shangpinxinxi " + where + " GROUP BY " + columnName + " LIMIT 10" 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			// let tableName = "shangpinxinxi"
			let where = " WHERE 1 = 1 "
			if ("shangpinxinxi" == "orders") {
				where += " AND status IN ('Paid', 'Dispatched', 'Completed') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM shangpinxinxi " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "shangpinxinxi"
			let where = " WHERE 1 = 1 "
			if ("shangpinxinxi" == "orders") {
				where += " AND status IN ('Paid', 'Dispatched', 'Completed') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') LIMIT 10";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')  LIMIT 10";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')  LIMIT 10";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)  LIMIT 10";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)  LIMIT 10";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)  LIMIT 10";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})












	return api
}
