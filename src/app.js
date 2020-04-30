const express = require('express')
const path = require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')



//console.log(__dirname)//comple pathh of directory
//console.log(__filename)//comple pathh of file
//console.log(path.join(__dirname,'../public'))//console.log(path.join(__dirname,'..'))//goes up 1 folder '../..' goes up 2 folder, /public goes to the sub directory
//joins path 

const app = express()//creating express application
const port = process.env.PORT || 3000
const viewsPath=path.join(__dirname,'../templates/views')//point to templates, ealry named as views
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(path.join(__dirname,'../public')))//express.static passing return value into use 
//above command displays the root page with content in the given public directory with the file special name index.html

// --set handel bars and views location--
app.set('view engine','hbs')//let us set a value for given express setting , fixed values in args,now handelbars is set up
//handel bar templates should be in a speific folder called views in root of the project


//if we name our view folder to templates , we need to specify path 
app.set('views',viewsPath)
// -- end -- 

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{ 
    res.render('index',{
        title:'Weather App',
        name:'Siddhant'
    })    //render allows to to render views ,as we hv config express to use view engine hbs 
//name of the .hbs template in views folder, //2nd arg as an object values that we want ot be accessed by the view in views folder 
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'Weather App about',
        name:'Siddhant abt'
    }) 
})


// app.get('',(req,res)=>{ //1st arg is an object containing info about the incoming req to the server, 2nd is res this contains buch of methods allowing us to cutomize what we send back to requester

//     res.send('hello bitch')//overridden with static func above

// })//func desc what to do when user visits this ' ' particular route 


app.get('/help',(req,res)=>{ 

    res.render('help',{
        name:'Siddhant g',
        title:'help'

    })

})


// app.get('/about',(req,res)=>{ 

//     res.send({ //object is send and data is displayed in json format 
//         name:'Andrew',
//         age:27
//     })

//})
app.get('/weather',(req,res)=>{ 
    if(!req.query.address)
{
    return res.send({
        error:'tell us the address dawg'
    })
}


 geocode(req.query.address,(error,data)=>{           //geocode called here, async operation , and callback called from there another async io operation foreacast , wait for thiscallback  to finish , 

    if(error)//if there an error
    {
         return res.send({error})//exits the func if error , just coverted string of error to object via short hand notation
    }
    //  console.log('Error '+error)
    //  console.log(data)

     //callback chaining 
     const {latitude,longitude,location}=data

 forecast(latitude,longitude, (error, forecastData) => {  //forecast called
    if(error)
    {
        return res.send({error})//exits the func if error
    }
    // console.log('Error', error)
    // console.log('Data', data)
    
 

    res.send({                     //we can send html and json data
        forecast:forecastData,
        location:location,
        address:req.query.address
    })
  })

        
 })

     

})


//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:"help not found",
        title:'custom 404'
    })
})


app.get('*',(req,res)=>{
    res.render('error',{
        message:"my 404 page",
        title:'404'
    })

})
app.listen(port,()=>{
    console.log('srvr is up at'+port)
})//common dev port , for http based website it is port 80(default), 2nd we can call callback func when server is up , async process




