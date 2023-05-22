/**
 * excel、csv 复制文本转 Array Of Array
 * @param {String} text
 */
export function clip2AOO(text) {
  const arr = text.split(/\r\n/);
  const keys = arr[0].split(/,|\t/);
  let aoo = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === "") continue;
    aoo.push({});
    arr[i] = arr[i].split(/,|\t/);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = arr[i][j].replace(/"/g, "");
      aoo[i - 1][keys[j]] = arr[i][j];
    }
  }

  return aoo;
}
