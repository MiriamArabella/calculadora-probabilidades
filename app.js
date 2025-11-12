// Utilidades comunes

export function factorial(n) {
  if (n < 0) throw new Error("n debe ser ≥ 0");
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

export function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  r = Math.min(r, n - r);
  let num = 1, den = 1;
  for (let k = 1; k <= r; k++) { num *= (n - r + k); den *= k; }
  return num / den;
}

export function toNumber(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

// ==== Binomial ====
export function binomialPMF(n, p, x) {
  return nCr(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

// ==== Poisson ====
export function poissonPMF(lambda, x) {
  if (x < 0) return 0;
  return Math.pow(lambda, x) * Math.exp(-lambda) / factorial(x);
}

export function poissonCDF(lambda, x) {
  let s = 0;
  for (let k = 0; k <= x; k++) {
    s += poissonPMF(lambda, k);
  }
  return s;
}

// ==== Exponencial ====
export function expPDF(lambda, x) {
  if (lambda <= 0) throw new Error("λ debe ser > 0");
  if (x < 0) return 0;
  return lambda * Math.exp(-lambda * x);
}

export function expCDF(lambda, x) {
  if (lambda <= 0) throw new Error("λ debe ser > 0");
  if (x < 0) return 0;
  return 1 - Math.exp(-lambda * x);
}

export function expBetween(lambda, a, b) {
  if (a > b) throw new Error("Debe cumplirse a ≤ b");
  return expCDF(lambda, b) - expCDF(lambda, a);
}

// ==== Normal ====
export function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const p = 1 - d * poly;
  return z >= 0 ? p : 1 - p;
}

export function normalBetween(mu, sigma, a, b) {
  if (sigma <= 0) throw new Error("σ debe ser > 0");
  const za = (a - mu) / sigma, zb = (b - mu) / sigma;
  return normalCDF(zb) - normalCDF(za);
}

// ==== Binomial Negativa ====
export function negbinPMF(r, p, x) {
  if (r <= 0 || p <= 0 || p >= 1 || x < 0) return 0;
  return nCr(x + r - 1, x) * Math.pow(1 - p, x) * Math.pow(p, r);
}

export function negbinCDF(r, p, x) {
  let s = 0;
  for (let k = 0; k <= x; k++) s += negbinPMF(r, p, k);
  return s;
}

// ==== Condicional ====
export function pA_givenB(pAB, pB) {
  if (pB <= 0 || pAB < 0) return NaN;
  return pAB / pB;
}

export function pB_givenA(pAB, pA) {
  if (pA <= 0 || pAB < 0) return NaN;
  return pAB / pA;
}

export function isIndependent(pA, pB, pAB) {
  return Math.abs(pAB - pA * pB) < 1e-12;
}
