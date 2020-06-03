export interface UserInterface {
    email:String,
    password:String,
    name:String,
    status:Number,
    profile: {
      _id:String,
      cantFotos:Number,
      imgpath:String,
      photos:Object,
      nickname:String,
      description:String
    } 
}