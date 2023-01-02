import net from 'net';
import chalk from 'chalk';
import { generateRandomColor, generateRandomName } from './utils.js';

let chättääjät = [];

let server = net.createServer((socket) => {
  socket.nickname = generateRandomName();
  socket.color = generateRandomColor();
  let clientName = socket.nickname;

  chättääjät.push(socket);

  console.log(`${chalk.hex(socket.color)(clientName)} joined the chat!`);

  socket.write('Welcome to the UBER_AWESOME chat!🌹\n');

  broadcast(
    clientName,
    `${chalk.hex(socket.color)(clientName)} joined this chat!\n`,
    socket
  );

  socket.on('end', () => {
    let message = `${chalk.hex(socket.color)(clientName)} left this chat!\n`;

    broadcast(clientName, message, socket);

    removeSocket(socket);

    broadcast(clientName, message, socket);
  });

  socket.on('data', (data) => {
    //console.log('Palvelin vastaanotti: ' + data);
    let message = `${clientName} > ${data.toString()}\n`;

    broadcast(clientName, message, socket);

    process.stdout.write(message);
  });

  socket.on('error', (error) => {
    console.log(error);
  });

  socket.on('close', function () {
    console.log('Connection closed');
  });
});

//Literally - "broadcast" the message to everyone in the room, except the sender themselves
const broadcast = (from, message) => {
  if (chättääjät.length === 0) {
    process.stdout.write('No one in the chat 🥲');
    return;
  }

  chättääjät.forEach((sock) => {
    //Everyone else except the sender gets the message
    if (sock.nickname === from) return;
    sock.write(message);
  });
};

const removeSocket = (socket) => {
  chättääjät.splice(chättääjät.indexOf(socket), 1);
};

server.on('error', (error) => {
  console.log('There seems to be a problem', error.message);
});

server.listen(1337, '127.0.0.1');
