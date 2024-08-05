import { BeforeSave, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';

// Здесь пишем поля, которые будут нужны для создания объкта из этого класса
interface UserCreationAttrs {
    username: string,
    password: string,
}

@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "ADMIN"
    })
    role: string;

    @BeforeSave
    static async hashPassword(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
        }

        async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}