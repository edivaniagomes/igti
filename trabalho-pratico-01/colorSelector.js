var sample = document.querySelector('#sample');

var newColor = [0, 0, 0];

function changeColor(rangeInput) {
  var rangeVal = rangeInput.value;
  var rangeColor = rangeInput.name;
  switch (rangeColor) {
    case 'red':
      newColor[0] = rangeVal;
      document.querySelector('#red-value').value = rangeVal;
      changeSample(newColor);
      break;

    case 'green':
      newColor[1] = rangeVal;
      document.querySelector('#green-value').value = rangeVal;
      changeSample(newColor);
      break;

    case 'blue':
      newColor[2] = rangeVal;
      document.querySelector('#blue-value').value = rangeVal;
      changeSample(newColor);
      break;

    default:
      break;
  }
}

function changeSample(newColor) {
  sample.style.background =
    'rgb(' + newColor[0] + ',' + newColor[1] + ',' + newColor[2] + ')';
}
