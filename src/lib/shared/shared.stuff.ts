import { isValidSuiObjectId, fromHEX } from '@mysten/sui/utils';
import baseX from 'base-x';

const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';
// //27cq3tlycwm5nihei6oxv6pbo2c1z5dpv6y67e7ux6swvwgra8.walrus.site
// const MINT_SITE_OBJECT_ID =
//   '0x58708dac4a7f4ae873c051e7191bb8674cafb4486a69913242a9582405f4ea20';
export const WALRUS_GAME_PACKAGE_ID =
  '0x9386430b67ebe8409dfba5a5be7e1963466439de7195ce736046631992e043c2';

const b36 = baseX(BASE36);

export function walrusLink(id: string): string {
  return 'https://' + b36.encode(fromHEX(id.substring(2))) + '.walrus.site';
}
