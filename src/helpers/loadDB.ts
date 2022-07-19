import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { iDocument } from '../document/entities/document.entity';
import { iUser } from '../user/entities/user.entity';

@Injectable()
export class LoadDB {
    myUserId = '62d2898355d0c18e984261f2';
    myContent: Array<{ title: string; text: string; keywords: Array<string> }> =
        [
            {
                title: 'Returns de los metodos de array',
                text: 'find: el primer objeto que cumple la condicion, undefined si no hay ninguno\nmap: un array (igual de grande que el original) con la transformación de cada elemento a través de la callback\nfilter: un array con los elementos del original que cumplen la condicion de la callback, array vacío si ningun la cumple\nforEach: undefined siempre\npush: el tamaño del array después de insertar',
                keywords: ['arrays', 'map', 'find', 'filter'],
            },
            {
                title: 'useCallback',
                text: 'useCallback sirve para que una función que no cambia no sea creada cada vez que se renderiza un componente de react\n\nDada una función definida en el componente y que está en un array de dependencias:\nconst prueba = () => { console.log("A fumar!") }\nUsamos useCallback para evitar que se genere una nueva cada vez:\nconst prueba = useCallback( () => { console.log("A fumar!") } )',
                keywords: ['react', 'useCallback', 'hooks'],
            },
            {
                title: 'Centrar un div',
                text: 'Para centrar el contenido de un div en css, lo más fácil es usar un display:flex y luego un justify-content:center\nSi también queremos centrarlo en vertical porque el div tiene una altura marcada, añadimos align-items:center, y si hay varios elementos dentro del div y nos interesa que se muestren en columna en lugar de en fila, flex-direction:column',
                keywords: ['css', 'centrar div'],
            },
            {
                title: 'Anidar ternarios',
                text: 'Primero de todo, anidar ternarios es, hablando en plata, de gilipollas\nPeeero en caso de necesidad imperiosa, ante por ejemplo una variable que puede tomar tres valores y que debe reflejarse en otros tres valores, el anidado de ternario sería el siguiente:\nlet emisor: true|false|undefined\nlet receptor: 1|2|3\n receptor = emisor === true ? 1 : emisor === false ? 2 : 3',
                keywords: ['anidar ternarios', 'Alejandro'],
            },
            {
                title: 'Formularios en react',
                text: 'La clave de un formulario reactivo en React es guardar en un estado el contenido del input de texto en cualquier momento que cambie y mostrar en ese input en todo momento el contenido de nuestro estado\nconst [nombre, setNombre] = useState("")\nhandleChange(ev: SyntheticEvent) {\n\tconst eventTarget = ev.target as HTMLFormElement;\n\tsetFormData(eventTarget.value);\n\nY en el template:\n<input value={nombre} onChange={handleChange} />}',
                keywords: ['react', 'formularios'],
            },
        ];
    myDocs: Array<iDocument>;

    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        @InjectModel('User') private readonly User: Model<iUser>
    ) {
        this.myDocs = this.myContent.map((item) => ({
            title: item.title,
            content: [
                {
                    text: item.text,
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: item.keywords as [string],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        }));
    }

    async load(secure: boolean): Promise<boolean> {
        if (secure) {
            await this.Document.insertMany(this.myDocs).then(async (resp) => {
                await this.User.findByIdAndUpdate(this.myUserId, {
                    myDocuments: resp.map((doc) => doc._id),
                });
            });
        }
        return secure;
    }
}
