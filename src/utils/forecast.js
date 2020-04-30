const request = require('request');
const forecast =(latitude,longitude,callback)=>{

    const url= 'http://api.weatherstack.com/current?access_key=27236a24f4fbb1f1789b0d676440a188&query='+latitude+','+longitude+'&units=f' 
 request({url,json:true},(error,{body}={})=>{
    if(error!=undefined)//if error on=bject exists 
    {
     callback('unable to connect',undefined)
    }
    else if(body.error)
    {
        callback("no locn found",undefined)

    }
    else{

    callback(undefined,body.current.temperature+'feels like'+ body.current.feelslike)

    }

 })


}
module.exports=forecast