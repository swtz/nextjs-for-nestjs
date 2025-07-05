import { styleText } from 'util';

export function logColor(...msg: (string | number)[]) {
  const messages = msg
    .map(message => styleText(['bgGreen', 'black'], `${message}`))
    .join(' ');
  console.log(styleText('green', messages));
}
