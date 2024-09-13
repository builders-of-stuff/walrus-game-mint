import { isValidSuiObjectId, fromHEX } from '@mysten/sui/utils';
import baseX from 'base-x';

const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';
// const SITE_OBJECT_ID =
//   '0x049b6d3f34789904efcc20254400b7dca5548ee35cd7b5b145a211f85b2532fa';
export const WALRUS_GAME_PACKAGE_ID = '';

const b36 = baseX(BASE36);

export function walrusLink(id: string): string {
  return 'https://' + b36.encode(fromHEX(id.substring(2))) + '.walrus.site';
}
