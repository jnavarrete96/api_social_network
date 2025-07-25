import { Model, DataTypes, Optional } from 'sequelize'
import sequelize  from '../database'

// 1. Define atributos de Post
interface PostAttributes {
  id: string
  user_id: string
  content: string
  created_at?: Date
}

// 2. Campos que podemos omitir al crear
interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'created_at'> {}

// 3. Clase que extiende Model
export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: string
  public user_id!: string
  public content!: string
  public created_at!: Date

  // timestamps
  public readonly updatedAt!: Date
  public readonly createdAt!: Date
}

// 4. Inicializar el modelo
Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'posts',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
)

// 5. Exportar
export default Post
