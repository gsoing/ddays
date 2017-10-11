
const interpolate = (str, templateContext) => {
  return str.replace(/{([\s\S]+?)}/g, (match, submatch) => templateContext[submatch]);
}

export default interpolate;
