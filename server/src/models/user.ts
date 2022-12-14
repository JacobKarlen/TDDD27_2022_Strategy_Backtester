import { Schema, model, Model, HydratedDocument, Document } from "mongoose";
import mongoose from "mongoose";

const bcrypt = require("bcrypt");

export interface SlimUser { 
    // used
    username: string,
    email: string
}

export interface IUser extends Document {
    //_id: Schema.Types.ObjectId | undefined; 
    username: string;
    email: string;
    password: string;
    following: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
}

interface UserModel extends Model<IUser> {
    userExists(username: string, email: string): Promise<boolean | Object>;
    authenticate(username: string, password: string): Promise<boolean | IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
    //"_id": { type: Schema.Types.ObjectId || undefined, required: true},
    "username": { type: String , required: true, unique: true },
    "email": { type: String , required: true, unique: true },
    "password": { type: String , required: true },
    "following": [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    "followers": [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Define schema methods for hashing and authentification
userSchema.pre('save', async function(next) {
    if (this.isNew) this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.static('userExists', async function(username, email): Promise<boolean | Object> {
    try {
        console.log(username)

        let userByUsername: HydratedDocument<IUser> | null = await User.findOne({ username }).exec()
        let userByEmail: HydratedDocument<IUser> | null = await this.findOne({ email })

        if (userByUsername && userByEmail) return { // refactor later
            username: 'This username is already taken.',
            email: 'This email is already taken.'
        }
        if (userByUsername) return { username: 'This username is already taken.' }
        if (userByEmail) return { email: 'This email is already taken.' }
        
        return false

    } catch (e) {
        console.log(e)
        return { message: 'An error on the server occured'}
    }
   
})

userSchema.static('authenticate', async function(username, password): Promise<boolean | IUser> {
    let user: IUser | null = await this.findOne({ $or: [ {email: username}, {username} ]})
    if (user && await bcrypt.compare(password, user.password)) return user
    return false
})


export const User = model<IUser, UserModel>('User', userSchema)
