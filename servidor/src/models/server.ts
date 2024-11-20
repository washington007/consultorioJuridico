import express, { Application, Request, Response } from 'express';
import routesListararchivo from '../routes/listararchivo';
import routesLogin from '../routes/login';
import routesConsultorio from '../routes/consultorios';
import cors from 'cors';
import Listararchivo from './listararchivo';
import Login from './login';
import Consultorio from './consultorio';

    
class Server{
    private app:Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';  
        this.listen();
        this.midlewares(); 
        this.routes();
        this.dbConnect();
    }
 
    listen(){
        this.app.listen(this.port, () => {
        console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes(){
        
        this.app.use('/api/listararchivos',routesListararchivo)
        this.app.use('/api/logins',routesLogin);
        this.app.use('/api/consultorios',routesConsultorio);
    }

    midlewares(){
        //Parseo Body
        // const whiteList = ['http://localhost:4200','http://localhost:3000'];
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cors());
        //Cors
        // this.app.use(cors({
        //     origin: whiteList,
        //     credentials: true,
        //     methods: ['GET','POST']
        // }));
    }

    //No borrar esto tomar en consideracion es para sincronizar con la BD
    async dbConnect(){
        try{
            //!Esta parte des/comentar 
            await Login.sync({alter:true})
            await Consultorio.sync({alter:true})
            await Listararchivo.sync({alter:true})

            // await Login.sync({force:true})
            // await Consultorio.sync({force:true})
            // await Listararchivo.sync({force:true})
        
            console.log('Conexion establecida satisfactoriamente');
        }catch (error){
            console.log('No es posible conectar con la BD',error)   ;
            
        }
    }
}

export default Server;

