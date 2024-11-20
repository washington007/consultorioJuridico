"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listararchivo_1 = __importDefault(require("../routes/listararchivo"));
const login_1 = __importDefault(require("../routes/login"));
const consultorios_1 = __importDefault(require("../routes/consultorios"));
const cors_1 = __importDefault(require("cors"));
const listararchivo_2 = __importDefault(require("./listararchivo"));
const login_2 = __importDefault(require("./login"));
const consultorio_1 = __importDefault(require("./consultorio"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/listararchivos', listararchivo_1.default);
        this.app.use('/api/logins', login_1.default);
        this.app.use('/api/consultorios', consultorios_1.default);
    }
    midlewares() {
        //Parseo Body
        // const whiteList = ['http://localhost:4200','http://localhost:3000'];
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        //Cors
        // this.app.use(cors({
        //     origin: whiteList,
        //     credentials: true,
        //     methods: ['GET','POST']
        // }));
    }
    //No borrar esto tomar en consideracion es para sincronizar con la BD
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //!Esta parte des/comentar 
                yield login_2.default.sync({ alter: true });
                yield consultorio_1.default.sync({ alter: true });
                yield listararchivo_2.default.sync({ alter: true });
                // await Login.sync({force:true})
                // await Consultorio.sync({force:true})
                // await Listararchivo.sync({force:true})
                console.log('Conexion establecida satisfactoriamente');
            }
            catch (error) {
                console.log('No es posible conectar con la BD', error);
            }
        });
    }
}
exports.default = Server;
