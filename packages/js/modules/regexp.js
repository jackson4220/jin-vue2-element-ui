export const OnlyCh = /^[\u4e00-\u9fa5]+$/; // 仅支持中文字符
export const Phone = /^1[3-9]\d{9}$/; // 手机号格式验证

export function validator(args, regx, message) {
	const [rule, value, callback] = args;
	if (value === '') {
		callback(new Error(message));
	} else if (!regx.test(value)) {
		callback(new Error(message));
	} else {
		callback();
	}
}
