import * as regexp from './modules/regexp';
import * as validate from './modules/validate';
import * as formate from './modules/formate';
import * as router from './modules/router';
export const { OnlyCh, Phone, validator } = regexp;
export const { isNumber } = validate;
export const { appendUrlParams, getOriValue } = formate;
export const { loopRouter, getUrlMergeQuery, getQueryObject } = router;
