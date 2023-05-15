/* eslint-disable consistent-return */
const formatNumbers = (n) => {
  if (n < 1e3) return n
  if (n >= 1e3 && n < 1e6) return `${+(n / 1e3).toFixed(2)}K`
  if (n >= 1e6 && n < 1e9) return `${+(n / 1e6).toFixed(2)} Million`
  if (n >= 1e9 && n < 1e12) return `${+(n / 1e9).toFixed(2)} Billion`
  if (n >= 1e12) return `${+(n / 1e12).toFixed(2)} Trillion`
}

const formatDecimals = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g
  const rep = "$1,"
  const arr = number?.toString()?.split(".")
  arr[0] = arr[0]?.replace(exp, rep)
  return arr[1] ? arr.join(".") : arr[0]
}

const round = (num, decimales = 2) => {
  var signo = num >= 0 ? 1 : -1
  num = num * signo
  if (decimales === 0)
    //con 0 decimales
    return signo * Math.round(num)
  // round(x * 10 ^ decimales)
  num = num.toString().split("e")
  num = Math.round(+(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales)))
  // x * 10 ^ (-decimales)
  num = num.toString().split("e")
  return signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales))
}

export { formatNumbers, formatDecimals, round }
