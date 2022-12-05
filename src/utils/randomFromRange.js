const randomFromRange = (min = 1, max = 10) => {
    return min + Math.random() * (max - min);
  };
  
  export default randomFromRange;