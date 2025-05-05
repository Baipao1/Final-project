import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

//  collect 表
const StoreupModel = sequelize.define('StoreupModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	userid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: 'userid'
	},
	refid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: 'Commodityid'
	},
	tablename: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '表名'
	},
	name: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Name'
	},
	picture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'Picture'
	},
	type: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '类型(1: collect ,21:赞,22:踩,31:竞拍参与,41:关注)'
	},
	inteltype: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: ' Recommend类型'
	},
	remark: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Remarks'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: 'Add时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'storeup'
})

export default StoreupModel
