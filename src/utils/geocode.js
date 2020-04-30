const request = require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2lkZGhhbnRncm92ZXIiLCJhIjoiY2s5ZnZxcTE0MGZibDNvbzdoZ2h5eTR5dyJ9.79ZT0k8J0elFdg7-MRNboA&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('unable to connect to locn services',undefined)//as 2 args , we dont specify 2 args by default 2nd one is set to undefined 
    
        }
        else if(body.features.length===0){
            callback('unable to find locn',undefined)
    
        }
        else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
                
            })//undfined as there is not an error and if we have error we dont have data , if we have data we dont have error 
            //if things go well this object is send back as the value for data down below
        }
    
    
    
    })
    
    
    }
  
    module.exports=geocode