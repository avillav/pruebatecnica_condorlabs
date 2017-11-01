

//========================================================================//
//============= CONNECTION (mongoDB URL) =================================//
//========================================================================//

//--conection mongoDB
/*--------INFO CONNECTION ----------------------
DB_Name     : evercheck-test-alejandro-villa
DB_User     : alejandrov
DB_Password : alejandrov
DB_url      : mongodb://DB_User:DB_Password@ds237855.mlab.com:37855/DB_Name
*/

//DB_url--> (mongodb://DB_User:DB_Password@URL_HOST:PORT/DB_Name)
var url_db = 'mongodb://alejandrov:alejandrov@ds237855.mlab.com:37855/evercheck-test-alejandro-villa';

//--mongoDB -- import mongoose (package ORM)
var mongoose = require('mongoose'); //-- npm install mongoose --save

//--server HTTP
var express = require('express');
var app = express();//npm install express

//--lib for response vars
var body_parser = require('body-parser');//--npm install body-parser
app.use(body_parser.urlencoded({extended:true}));

//--connect with DB mongoDB
var db = mongoose.connect(url_db, function(error){
   if(error){
      throw error;
   }else{
      console.log('====== Conectado a MongoDB ======');
   }
});


//========================================================================//
//============= MODELS (specialties, providers) ==========================//
//========================================================================//

//------- define models ----------------------------------
//--->> define model/schema (specialties)
var specialtiesSchema = mongoose.Schema({

    name      : { type : String, trim : true },
    createdBy : { type : Number , trim : true },
    createdAt : { type : Date , trim : true },
    updatedBy : { type : Number , trim : true },
    updatedAt : { type : Date , trim : true }
});

//--->> define model/schema (providers)
var providersSchema = mongoose.Schema({

    firstName           : { type : String, trim : true },
    lastName            : { type : String, trim : true },
    middleName          : { type : String, trim : true },
    email               : { type : String, trim : true },

    specialty           : { type : specialtiesSchema, trim : true },//---document of specialty

    projectedStartDate  : { type : Date ,   trim : true },
    employerId          : { type : Number , trim : true },
    providerType        : { type : String,  trim : true },
    staffStatus         : { type : String,  trim : true },
    assignedTo          : { type : Number , trim : true },
    status              : { type : String,  trim : true },
    createdBy           : { type : Number , trim : true },
    createdAt           : { type : Date ,   trim : true },
    updatedBy           : { type : Number , trim : true },
    updatedAt           : { type : Date ,   trim : true }
});


//------- create models ----------------------------------
var Specialty = db.model('specialties', specialtiesSchema);
var Provider  = db.model('providers', providersSchema);




//------- create instances of models ----------------------
var currentDate = new Date();
//--create a NEW (Specialty)
var Specialty_test =  new Specialty({
    name      : 'test1_name_Specialty',
    createdBy : '123',
    createdAt : currentDate,
    updatedBy : '123',
    updatedAt : currentDate
});


//--create a NEW (Provider)
var Provider_test =  new Provider({

    firstName           : 'test1_name1_provider',
    lastName            : 'test1_name2_provider',
    middleName          : 'A',
    email               : 'test@test.test',

    specialty           : Specialty_test, //--->>Specialty created before

    projectedStartDate  : '2016-10-30T11:31:07.487Z',
    employerId          : '111',
    providerType        : 'DPM',
    staffStatus         : 'CONSULTING',
    assignedTo          : '1515',
    status              : 'READY_FOR_REVIEW',
    createdBy           : '123',
    createdAt           : currentDate,
    updatedBy           : '123',
    updatedAt           : currentDate
});




//========================================================================//
//============= CRUD (Create, Read, Update, Delete) ======================//
//===================(specialties, providers) ============================//

//================== Routes app -- Functions CRUD ========================//

//=========================== CREATE =====================================//
//--Create automatic test (GET)
app.get('/create_test', function (req, res) {

  //--Create Specialty
  Specialty_test.save(function(err, my_specialty){
       console.log(err);
       console.log(my_specialty);
       console.log('****---Specialty created ---****');
     });

  //--Create Provider
  Provider_test.save(function(err, my_provider){
       console.log(err);
       console.log(my_provider);
       console.log('****---Provider created---****');
     });

     res.send('{****---finish Create Provider and Specialty---****}');

});




/*//--vars (URL)
name=test1_Specialty&firstName=alejo&lastName=villa&middleName=midd&email=alejo102030@hotmail.com&employerId=852&providerType=DPM&staffStatus=CONSULTING&assignedTo=1515&status=READY_FOR_REVIEW
//--test POST since console (DOS)
curl -i -d "name=test1_Specialty&firstName=alejo&lastName=villa&middleName=midd&email=alejo102030@hotmail.com&employerId=852&providerType=DPM&staffStatus=CONSULTING&assignedTo=1515&status=READY_FOR_REVIEW" http://localhost:8080/create
*/

//--create_provider (POST)
app.post('/create_provider', function (req, res) {

  //--!!!! check name of Specialty <<--------

  Specialty.findOne().where('name', req.body.name).exec(function(err,my_specialty){

     //--SI NO hay resultados (no existe)
     if (my_specialty == null) {
       //====>>> create a NEW (Specialty)
       var my_Specialty =  new Specialty({
           name      : req.body.name,
           createdBy : '123',
           createdAt : currentDate,
           updatedBy : '123',
           updatedAt : currentDate
       });

       //--Create Specialty in DB
       my_Specialty.save(function(err, my_specialty){
            console.log(err);
            console.log(my_specialty);
            console.log('****---Specialty created ---****');
          });

      }else {
       //--SI hay resultados (si existe)
       var my_Specialty =  my_specialty;
      }


      //--create a NEW (Provider)
      var my_Provider =  new Provider({

          firstName           : req.body.firstName,
          lastName            : req.body.lastName,
          middleName          : req.body.middleName,
          email               : req.body.email,

          specialty           : my_Specialty, //--->>Specialty created before

          projectedStartDate  : '2016-10-30T11:31:07.487Z',
          employerId          : req.body.employerId,
          providerType        : req.body.providerType,
          staffStatus         : req.body.staffStatus,
          assignedTo          : req.body.assignedTo,
          status              : req.body.status,
          createdBy           : '123',
          createdAt           : currentDate,
          updatedBy           : '123',
          updatedAt           : currentDate
        });


        //--Create Provider in DB
        my_Provider.save(function(err, my_provider){
             console.log(err);
             console.log(my_provider);
             console.log('****---Provider created---****');
           });

           //console.log(my_Specialty);
           //console.log(my_Provider);
           res.send('{****---finish Create Provider ---****}');

  });

});


//--create_specialty (POST)
app.post('/create_specialty', function (req, res) {

  Specialty.findOne().where('name', req.body.name).exec(function(err,my_specialty){

     //--SI NO hay resultados (no existe)
     if (my_specialty == null) {
       //====>>> create a NEW (Specialty)
       var my_Specialty =  new Specialty({
           name      : req.body.name,
           createdBy : '123',
           createdAt : currentDate,
           updatedBy : '123',
           updatedAt : currentDate
       });

        //--Create Specialty in DB
        my_Specialty.save(function(err, my_specialty){
            console.log(err);
            console.log(my_specialty);
            console.log('****---Specialty created ---****');
          });

          res.send('{****---Specialty created ---****}');

      }else {
       //--SI hay resultados (si existe)
       res.send('{ Specialty already exists }');
      }

  });


});



//=========================== READ =====================================//

//--read_all_providers (GET)
app.get('/read_all_providers', function (req, res) {
  Provider.find().exec(function(err,my_providers){
     console.log(err);
     //console.log(my_providers);
     res.send(my_providers);
  });
});

//--read_all_specialties (GET)
app.get('/read_all_specialties', function (req, res) {
  Specialty.find().exec(function(err,my_specialties){
     console.log(err);
     //console.log(my_specialties);
     res.send(my_specialties);
  });
});




//--read_provider(firstName)
app.get('/read_provider/:firstName', function (req, res) {

    Provider.findOne().where('firstName', req.params.firstName).exec(function(err,my_provider){
       console.log(err);
       console.log(my_provider);

       //--NO hay resultados
       if (my_provider == null) {
         res.send('{ no existe }');
       }else {
         //--SI hay resultados
         res.send(my_provider);
       }

    });

});


//--read_specialty(name)
app.get('/read_specialty/:name', function (req, res) {

    Specialty.findOne().where('name', req.params.name).exec(function(err,my_specialty){
       console.log(err);
       console.log(my_specialty);

       //--SI NO hay resultados
       if (my_specialty == null) {
         res.send('{ no existe }');
       }else {
         //--SI hay resultados
         res.send(my_specialty);
       }

    });

});

//=========================== UPDATE =====================================//

//--update_specialty(name,new_name)
app.post('/update_specialty', function (req, res) {

  var name = req.body.name;
  var new_name = req.body.new_name;

  if (new_name != null) {

    Specialty.findOneAndUpdate({ name: name },
                              { name: new_name }, function(err, my_Specialty) {
      if (err) throw err;

      console.log('****---Specialty updated---****');
      res.send(my_Specialty);

    });


  }else {
    console.log('****---error with new_name---****');
    res.send('****---error with new_name---****');

  }

});



//--update_provider(firstName,lastName)
app.post('/update_provider', function (req, res) {

  var my_firstName = req.body.firstName;
  //var my_new_firstName = req.body.new_firstName;


  if (my_firstName != null) {

    //--1)read
    Provider.findOne().where('firstName', my_firstName).exec(function(err,my_provider){
       //--NO hay resultados
       if (my_provider == null) {
         res.send('{ no existe }');
       }else {
         //--SI hay resultados
         //--check req data
         //var middleName,email,providerType,staffStatus,status,updatedAt;

         //--add new info
         if (req.body.middleName)  my_provider.middleName = req.body.middleName;
         if (req.body.email)  my_provider.email = req.body.email;
         if (req.body.providerType)  my_provider.providerType = req.body.providerType;
         if (req.body.staffStatus)  my_provider.staffStatus = req.body.staffStatus;
         if (req.body.status)  my_provider.status = req.body.status;

         my_provider.updatedAt = currentDate;

         //---->>UPDATE
         my_provider.save(function(err) {
            if (err) throw err;

            console.log('my_provider successfully updated!');
            res.send(my_provider);
          });

       }

    });


  }else {
    console.log('****---error with firstName---****');
    res.send('****---error with firstName---****');

  }


});



//=========================== DELETE =====================================//

//--delete_provider(firstName) --->> Read and Delete
app.get('/delete_provider/:firstName', function (req, res) {

  //--1) Read
  Provider.findOne().where('firstName', req.params.firstName).exec(function(err,my_provider){
    //--NO hay resultados
    if (my_provider == null) {
      res.send('{ no existe }');
    }else {
      //--SI hay resultados //--2) Delete
      my_provider.remove(function(err) {
        if (err) throw err;

        res.send('{****---Provider deleted---****}');
        console.log('****---Provider deleted---****');
      });
    }
  });

});




//--delete_specialty(name) --->> Read and Delete
app.get('/delete_specialty/:name', function (req, res) {

  //--1) Read
  Specialty.findOne().where('name', req.params.name).exec(function(err, my_Specialty){
    //--NO hay resultados
    if (my_Specialty == null) {
      res.send('{ no existe }');

    }else {
      //--SI hay resultados //--2) Delete
      my_Specialty.remove(function(err) {
        if (err) throw err;

        res.send('{****---Specialty deleted---****}');
        console.log('****---Specialty deleted---****');
      });
    }
  });

});






//--Server ON (port)
app.listen(8080, function () {
  console.log('====== Conectado a Server port 8080 ======');
});
