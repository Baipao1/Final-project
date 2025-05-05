import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// address
const AddressModel = sequelize.define('AddressModel', {
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
	address: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'address'
	},
	name: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Consignee'
	},
	phone: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'Phone Number'
	},
	isdefault: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'yesnoDefault[yes/no]'
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
	tableName: 'address'
})

export default AddressModel
