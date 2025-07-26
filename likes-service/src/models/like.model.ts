import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../database'

interface LikeAttributes {
  id: string
  user_id: string
  post_id: string
  created_at?: Date
}

interface LikeCreationAttributes extends Optional<LikeAttributes, 'id' | 'created_at'> {}

export class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {
  public id!: string
  public user_id!: string
  public post_id!: string
  public created_at!: Date
}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'likes',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
)

export default Like
