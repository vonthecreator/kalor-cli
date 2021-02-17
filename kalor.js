const nearestColor = require('nearest-color');
const namedColors = require('color-name-list');
const getColors = require('get-image-colors');
const invert = require('invert-color');
const path = require('path');
const fs = require('fs')
const color = require('color');



let colors = namedColors.reduce((o, {
    name,
    hex
}) => Object.assign(o, {
    [name]: hex
}), {});


let nearest = nearestColor.from(colors);
let pallet = new Array;
let stylesheet = new Array;


const options = {
 count: 255,
 type: 'image/jpg'
}



function exportColors(pallet) {
 fs.createWriteStream(__dirname + '/pallets/kalor.scss', (err) => {
  if (err){
   console.error(err)
   return
  }
  pallet.forEach(function(color) {
   file.write(color);
  });
  file.end();
 })
}


function kalor(inputFile){
 getColors(inputFile, options).then(colors => {
  let map = colors.map(color => color.hex());
  let x = map.length;

  while ( x >= 0 ){
   if (map[x] != map[x+1]){
    pallet.push({
     parent: nearest(map[x]),
     child: nearest(invert(map[x]))
    })

   let objKey = nearest(map[x]).name;
   let name = objKey.split(' ').join('-').toLowerCase();
   let hexcode = nearest(map[x]).value;
   stylesheet.push("$" + name + ": " + hexcode.toString() + ";\n")
   }
   x--;
  }
  exportColors(stylesheet);
 })
}



switch(process.argv[3]){
 case 'sass':
  console.log("sass");
 break;

 default:
  kalor(process.argv[2].toString())
}




















