// Soal 1 : Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

let txt = 'NEGIE1'

function reverse (str) {
    return str.replace(/[A-Za-z]+/g, x => Array.from(x).reverse().join(''))
}

console.log(reverse(txt))


// Soal 2 : Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

const sentence = "Saya sangat senang mengerjakan soal okalgoritma"

function longest (word) {
    return word.split(' ').reduce((a,b) => a.length >= b.length? a : b)
}

console.log(longest(sentence))


// Soal 3: Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

const input = ['xc', 'dz', 'bbb', 'dz']  
const query = ['bbb', 'ac', 'dz']

function count (inp, quer) {
    return quer.map(x => inp.filter(y => y == x).length)
}

console.log(count(input, query))


// Soal 4 : Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

function diagonalSum (arr) {
    return arr.reduce((a,b,i) => a + (b[i] - b[(arr.length -1) - i]),0)
}

console.log(diagonalSum(matrix))