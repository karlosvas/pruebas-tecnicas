// 6. Vamos a crear nuestra propia utilidad `dotenv` en el archivo`dotenv.js`.
// - La utilidad debe devolver un método `config` que lee el archivo `.env` y añade las variables de entorno que haya en el archivo al objeto`process.env`.
import fs from "fs";

export function config({ path = '.env' } = {}) {
    try {
        const env = fs.readFileSync(path, 'utf-8');
        const lines = env.split("\n");

        lines.forEach(line => {
            const [key, ...value] = line.split('=');
            const joinedValues = value.join('=');

            const hasQuotes = joinedValues.startsWith('"') && joinedValues.endsWith('"');

            const valueToStorage = hasQuotes
                ? joinedValues.slice(1, -1)
                : joinedValues;

            process.env[key] = valueToStorage;
        });
    } catch (error) {
    }
}
// Llamada a la función config para agregar o modificar variables de entorno
// config({ path: "./config/.env", data: { APIKEY: "fbdghucasgudhfvjak" } });

