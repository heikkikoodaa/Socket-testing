import net from 'net';
import * as readline from 'node:readline';

let client = new net.Socket();
let rl = readline.createInterface(process.stdin, process.stdout);
client.connect(1337, '127.0.0.1', () => {
  // client.write('Hello, server! Love, Client.');
  console.log('Connected!');
});

client.on('data', (data) => {
  //lue komentoriviltä tekstiä ja lähetä se sockettiin.
  //    client.write (komentoriviltäluettudata)

  rl.setPrompt(`>`);
  rl.prompt();

  rl.on('line', (teksti) => {
    // console.log(`teksti: ${teksti}`);
    client.write(teksti);
  });
  //    client.write("Viesti asiakkaalta")

  //	client.destroy(); // kill client after server's response
});

client.on('close', () => {
  console.log('Connection closed');
});
