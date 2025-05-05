import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// Commodity informationComment表
const DiscussshangpinxinxiModel = sequelize.define('DiscussshangpinxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	refid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '关联表id'
	},
	userid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: 'userid'
	},
	avatarurl: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'Profile picture'
	},
	nickname: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: 'User'
	},
	content: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'CommentContent'
	},
	reply: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复Content'
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
	tableName: 'discussshangpinxinxi'
})

export default DiscussshangpinxinxiModel
