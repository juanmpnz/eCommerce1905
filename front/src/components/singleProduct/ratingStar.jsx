const ratingStar = {
    size: 25,
    count: 5,
    isHalf: false,
    value: 0,
    color: "#012574",
    activeColor: "#F9C312",
    onChange: (newValue) => {
      console.log(`new value is ${newValue}`);
      console.log(
        "ACA ESTA EL VALOR ADENTRO DE LAS ESTRELLAS",
        ratingStar.value
      );
    //   rating(newValue);
    },
}

export default ratingStar