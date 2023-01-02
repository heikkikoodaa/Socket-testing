const names = ['sakura', 'majima', 'kazuma', 'suzuki', 'cutiepie', 'kawaii'];

const generateRandomName = () => {
  const index = Math.floor(Math.random() * names.length);
  const randomNumber = Math.floor(Math.random() * 15000);

  return `${names[index]}${randomNumber}`;
};
const generateRandomColor = () => {
  // 16777215 == FFFFFF
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex}`;
};

export { generateRandomColor, generateRandomName };
