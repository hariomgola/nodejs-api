const data = {
  name: Hari,
};
data.toJSON = function () {
  console.log(this);
  // return this;
  return {};
};
console.log(JSON.stringify(data));
