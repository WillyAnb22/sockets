


let ticketCounter = 1; // Inicializar el contador de tickets
let ticketList =[];
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        //se recibe el coallback para responder en el 
        //ejemplo de bd, solo el cliente que pidio, recibe
        const id = 123456789;
        callback(id);//primero sin estas dos lineas
        //es como un feedback de que que todo se ejecuta correctamente

        socket.broadcast.emit('enviar-mensaje', payload);
        //socket.emit('enviar-mensaje', payload );
    })
    socket.on('nuevo-ticket', (callback) => {
        const nuevoTicket = generarNuevoTicket(); // Aquí deberías tener la lógica para generar un nuevo ticket
        callback(nuevoTicket); // Envía el nuevo ticket de vuelta al cliente
    });
};

const generarNuevoTicket = () => {
    // Genera un nuevo ticket con un número en orden
    const ticket = `Ticket ${ticketCounter}`;
    ticketCounter++; // Incrementa el contador para el próximo ticket
    return ticket;
};



export {
    socketController
}

