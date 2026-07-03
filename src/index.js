const app= require('./app');
const config = require('./config');
const connectDB = require('./db');

async function startServer(){
  try{
    //esperamo sprimero la conexión a MongoDB
    await connectDB();

    //solo se inicia el servidor si la conexión fue exitosa
    app.listen(config.PORT,()=>{
      console.log(`ShipNow escuchando en el puerto ${config.PORT}`);
    });
  }catch (error){
    console.error('no se pudo iniciar la aplicación:', error.message);
    process.exit(1);
  }
}


startServer();