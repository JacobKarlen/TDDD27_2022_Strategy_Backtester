import { Schema, model, Model, HydratedDocument } from "mongoose";
const bcrypt = require("bcrypt");


export interface IUser {
    username: string;
    email: string;
    password: string;
}

interface UserModel extends Model<IUser> {
    userExists(username: string, email: string): Promise<boolean | Object>;
    authenticate(username: string, password: string): Promise<boolean | IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
    "username": { type: String , required: true, unique: true },
    "email": { type: String , required: true, unique: true },
    "password": { type: String , required: true },
});

// Define schema methods for hashing and authentification
userSchema.pre('save', async function(next) {
    if (this.isNew) this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.static('userExists', async function({username, email}): Promise<boolean | Object> {
    try {
        let user: HydratedDocument<IUser> | null = await User.findOne({}).exec()

        if (user) return { username: 'This username is already taken' }
    
        user = await this.findOne({ email })
        if (user) return { email: 'This email is already taken' }
        
        return false

    } catch (e) {
        console.log(e)
        return { message: 'An error occured'}
    }
   
})

userSchema.static('authenticate', async function(username, password): Promise<boolean | IUser> {
    let user: IUser | null = await this.findOne({ $or: [ {email: username}, {username} ]})
    if (user && await bcrypt.compare(password, user.password)) return user
    return false
})


export const User = model<IUser, UserModel>('User', userSchema)
