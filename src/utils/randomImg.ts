export default function getImgPath() {
  return require(`../assets/images/jpg/boardImgs/city${Math.floor(Math.random() * 5 + 1)}.jpg`);
}
