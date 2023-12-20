import { isString, isPlainObject, isArray, cloneDeep, isEqual } from "lodash";

//模板转换函数，将一个由双大括号包裹的字符串，转化为js表达式并返回结果（context限制变量范围）
export const templateParse = (str, context) => {
  if (!str) return str;
  if (typeof str !== "string") return str;

  const template = str.match(/{{(.+?)}}/);
  if (template) {
    try {
      const parse = new Function(
        Object.keys(context).join(","),
        "return " + template[1]
      );

      return parse(...Object.values(context));
    } catch (e) {
      console.log(str, "模板转换错误：", e);
      return str;
    }
  } else {
    return str;
  }
};

export const deepParse = (prop, context) => {
  if (isString(prop)) {
    return templateParse(prop, context);
  }
  if (isPlainObject(prop)) {
    return Object.keys(prop).reduce((all, key) => {
      if (prop.name) {
        return {
          ...all,
          [key]: deepParse(prop[key], {
            ...context,
            $value: context.$form[prop.name],
          }),
        };
      }
      return { ...all, [key]: deepParse(prop[key], context) };
    }, {});
  }
  if (isArray(prop)) {
    return prop
      .filter((item) => !templateParse(item.hidden, context))
      .map((item) => deepParse(item, context));
  }

  return prop;
};

export const handleLinkages = ({ newVal, oldVal, form, formItems }) => {
  const formValue = cloneDeep(form.value);

  for (const item of formItems) {
    //TODO：bug。自增组件使用linkage无效，因为新旧val一样不知什么原因

    // if (item.linkage) {
    //   console.log(item, newVal[item.name], oldVal[item.name]);
    // }

    if (item.linkage && !isEqual(newVal[item.name], oldVal[item.name])) {
      item.linkage.forEach((v) => {
        const [name, path, child] = v.target.split(".");

        if (v.value != null) {
          // 有路径视为自增组件
          if (path && path === "*" && isArray(formValue[name])) {
            formValue[name] = formValue[name].map((item) => ({
              ...item,
              [child]: v.value,
            }));
          } else {
            formValue[name] = v.value;
          }
        }
      });

      form.value = formValue;
    }

    if (item.children) {
      handleLinkages({ newVal, oldVal, form, formItems: item.children });
    }
  }
};

//可指定长度，生成随机id
export const getRandomId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

export const changeItems = (items) => {
  return items.map((item) => {
    const data = {
      ...item,
      onlyId: item.onlyId || `form-${getRandomId(4)}`,
      name: item.name || getRandomId(6),
    };
    if (item.children) {
      data.children = changeItems(item.children);
    }
    return data;
  });
};

export const componentNames = {
  formList: "自增容器",
  itemGroup: "字段组",
};
