const compNum1 = {
  re: 10,
  im: 5,
};

const compNum2 = {
  re: 5,
  im: 2,
};

export function add(cpx1, cpx2) {
  let re = cpx1.re + cpx2.re;
  let im = cpx1.im + cpx2.im;

  if (im < 0) {
    return re + "-" + -im + "i";
  } else {
    return re + "+" + im + "i";
  }
}

export function sub(cpx1, cpx2) {
  let re = cpx1.re - cpx2.re;
  let im = cpx1.im - cpx2.im;

  if (im < 0) {
    return re + "-" + -im + "i";
  } else {
    return re + "+" + im + "i";
  }
}

export function mul(cpx1, cpx2) {
  let re = cpx1.re * cpx2.re - cpx1.im * cpx2.im;
  let im = cpx1.re * cpx2.im + cpx1.im * cpx2.re;

  if (im < 0) {
    return re + "-" + -im + "i";
  } else {
    return re + "+" + im + "i";
  }
}

export function div(cpx1, cpx2) {
  let re = cpx1.re * cpx2.re + cpx1.im * cpx2.im;
  let im = -cpx1.re * cpx2.im + cpx1.im * cpx2.re;

  let top = "";
  let bottom = cpx2.re * cpx2.re + cpx2.im * cpx2.im;

  if (im < 0) {
    top = re + "-" + -im + "i";
  } else {
    top = re + "+" + im + "i";
  }

  return "(" + top + ")" + "/" + bottom;
}
