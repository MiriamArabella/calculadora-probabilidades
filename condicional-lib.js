// ====== utilidades ======
window.toNumber = function (v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

// ====== condicional ======
window.pA_givenB = function (pAB, pB) {
  if (pB <= 0 || pAB < 0) return NaN;
  return pAB / pB;
};

window.pB_givenA = function (pAB, pA) {
  if (pA <= 0 || pAB < 0) return NaN;
  return pAB / pA;
};

window.isIndependent = function (pA, pB, pAB, eps = 1e-12) {
  return Math.abs(pAB - pA * pB) < eps;
};
