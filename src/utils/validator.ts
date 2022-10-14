/**
 * @description 自定义验证规则：判断是否是可用手机号（过滤了不真实的手机号码）
 * @returns {boolean}
 */
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback();
  } else {
    const reg =
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      // 正确
      callback();
    } else {
      // 错误
      callback(new Error("Wrong format! Please check and enter again"));
    }
  }
};

/**
 * @description 自定义验证规则：判断是否是可用手机号（过滤了不真实的手机号码）
 * @returns {boolean}
 */
export const validatePhoneNotEmpty = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Phone can not be empty"));
  } else {
    const reg =
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      // 正确
      callback();
    } else {
      // 错误
      callback(new Error("Wrong format! Please check and enter again"));
    }
  }
};

/**
 * @description 自定义验证规则：判断是否是邮箱
 * @returns {boolean}
 */
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback();
  } else {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) {
      // 正确
      callback();
    } else {
      // 错误
      callback(new Error("Wrong format! Please check and enter again"));
    }
  }
};

/**
 * @description 自定义验证规则：判断是否是邮箱
 * @returns {boolean}
 */
export const validateEmailNotEmpty = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Email can not be empty"));
  } else {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) {
      // 正确
      callback();
    } else {
      // 错误
      callback(new Error("Wrong format! Please check and enter again"));
    }
  }
};
