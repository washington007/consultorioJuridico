export const transformarFecha = (fecha: string): string => {
    // Dividimos el string de la fecha en año y mes
    const [year, month] = fecha.split('-').map(Number);

    // Crear una nueva fecha para el último día del mes especificado a las 19:00:00.000
    const date = new Date(year, month - 1, 30, 19, 0, 0, 0);

    // Formatear la fecha en el formato 'YYYY-MM-DD HH:mm:ss.SSS'
    const pad = (num: number) => String(num).padStart(2, '0');
    const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${String(date.getMilliseconds()).padStart(3, '0')}`;

    return formattedDate;
}

