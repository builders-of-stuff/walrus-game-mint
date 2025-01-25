import { isValidSuiObjectId, fromHEX } from '@mysten/sui/utils';
import baseX from 'base-x';

const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';
// //27cq3tlycwm5nihei6oxv6pbo2c1z5dpv6y67e7ux6swvwgra8.walrus.site
// const MINT_SITE_OBJECT_ID =
//   '0x58708dac4a7f4ae873c051e7191bb8674cafb4486a69913242a9582405f4ea20';
export const WALRUS_GAME_PACKAGE_ID =
  '0xc314dece944a590e0de2192befbb289b4522d0f5417acc05029c86b48e7d9818';

const b36 = baseX(BASE36);

export function walrusLink(id: string): string {
  return 'https://' + b36.encode(fromHEX(id.substring(2))) + '.walrus.site';
}

// 0xb5d80c3b9b7a9a66f57e21e7741e3ee385a65faeca5a02701e359f7a5578808a
// https://4j5tbcmxs58v45u0w927p2vzmed5zfhnbrhe29oz699h8872iy.walrus.site
