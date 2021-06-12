export default function diffArray (arr1, arr2) {
  console.log(arr1)
  console.log(arr2)
  return arr1.filter(i => !arr2.includes(i))
}
