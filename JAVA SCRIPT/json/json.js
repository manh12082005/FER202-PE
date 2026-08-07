const object ={
    title: "Toan",
    diem: 8,
}
console.log(object);
//chuyen JS sang JSON
const json = json.stringify(object);
console.log(json);
//chuyen JSON sang JS
const json1 = JSON.parse(json);
console.log(json1);
