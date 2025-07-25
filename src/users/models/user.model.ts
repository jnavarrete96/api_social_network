import { DataTypes, Model, Optional } from 'sequelize';
import sequelize  from '../../../config/database';

export interface UserAttributes {
  id: string;
  full_name: string;
  birth_date: Date;
  user_name: string;
  email: string;
  password_hash: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public full_name!: string;
  public birth_date!: Date;
  public user_name!: string;
  public email!: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);
