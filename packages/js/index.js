import * as regexp from './modules/regexp';
import * as validate from './modules/validate';
import * as formate from './modules/formate';
import * as router from './modules/router';
export const { OnlyCh, Phone } = regexp;
export const { isNumber } = validate;
export const { appendUrlParams } = formate;
export const { loopRouter } = router;
